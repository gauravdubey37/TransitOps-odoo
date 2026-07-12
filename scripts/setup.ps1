# TransitOps - One-command local setup for Windows
# Starts Docker databases, runs migrations, and loads seed data.

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$EnvFile = Join-Path $ProjectRoot ".env"
$EnvExample = Join-Path $ProjectRoot ".env.example"
$ComposeFile = Join-Path $ProjectRoot "docker\docker-compose.yml"

function Write-Log($Message) {
    $timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    Write-Host "[setup] $timestamp $Message"
}

function Ensure-EnvFile {
    if (-not (Test-Path $EnvFile)) {
        if (-not (Test-Path $EnvExample)) {
            throw ".env.example not found at $EnvExample"
        }
        Copy-Item $EnvExample $EnvFile
        Write-Log "Created .env from .env.example"
    } else {
        Write-Log ".env already exists"
    }
}

function Load-EnvFile {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Item -Path "env:$name" -Value $value
        }
    }
}

function Wait-PostgresHealthy {
    $maxAttempts = 30
    for ($i = 1; $i -le $maxAttempts; $i++) {
        docker exec transitops-postgres pg_isready -U transitops -d transitops 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Log "PostgreSQL is healthy"
            return
        }
        Write-Log "Waiting for PostgreSQL... ($i/$maxAttempts)"
        Start-Sleep -Seconds 2
    }
    throw "PostgreSQL did not become healthy in time"
}

function Invoke-SqlFile($FilePath) {
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $content | docker exec -i transitops-postgres psql -U transitops -d transitops -v ON_ERROR_STOP=1 -q
    if ($LASTEXITCODE -ne 0) {
        throw "SQL failed: $FilePath"
    }
}

function Run-Migrations {
    $migrationDir = Join-Path $ProjectRoot "database\migrations\postgres"
    $files = Get-ChildItem $migrationDir -Filter "*.sql" | Sort-Object Name

    foreach ($file in $files) {
        $version = $file.BaseName
        $exists = docker exec transitops-postgres psql -U transitops -d transitops -t -A -c `
            "SELECT COUNT(*) FROM schema_migrations WHERE version = '$version' AND success = TRUE;" 2>$null

        if ($exists -eq "1") {
            Write-Log "SKIP $($file.Name) (already applied)"
            continue
        }

        Write-Log "APPLY $($file.Name)"
        Invoke-SqlFile $file.FullName

        docker exec transitops-postgres psql -U transitops -d transitops -q -c `
            "INSERT INTO schema_migrations (version, filename, success) VALUES ('$version', '$($file.Name)', TRUE) ON CONFLICT (version) DO NOTHING;"
    }
}

function Run-Seeds {
    $seedProfile = if ($env:SEED_PROFILE) { $env:SEED_PROFILE } else { "development" }
    $seedDir = Join-Path $ProjectRoot "database\seed\$seedProfile"

    if (-not (Test-Path $seedDir)) {
        throw "Seed profile not found: $seedDir"
    }

    $files = Get-ChildItem $seedDir -Filter "*.sql" | Sort-Object Name
    foreach ($file in $files) {
        Write-Log "SEED $($file.Name)"
        Invoke-SqlFile $file.FullName
    }
}

function Seed-AdminUser {
    $email = if ($env:ADMIN_EMAIL) { $env:ADMIN_EMAIL } else { "admin@transitops.local" }
    $password = if ($env:ADMIN_PASSWORD) { $env:ADMIN_PASSWORD } else { "changeme" }

    Write-Log "Creating admin user ($email)"

    $sql = @"
INSERT INTO users (user_id, full_name, email, password_hash, role_id, is_active)
VALUES (
    'a6000000-0000-4000-8000-000000000001',
    'System Administrator',
    '$email',
    crypt('$password', gen_salt('bf', 10)),
    'a0000000-0000-4000-8000-000000000001',
    TRUE
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = crypt('$password', gen_salt('bf', 10)),
    updated_at = NOW();
"@

    $sql | docker exec -i transitops-postgres psql -U transitops -d transitops -v ON_ERROR_STOP=1 -q
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create admin user"
    }
}

# --- Main ---

Write-Log "TransitOps local setup starting"

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker is not installed or not in PATH. Install Docker Desktop first."
}

Ensure-EnvFile
Load-EnvFile

Write-Log "Starting PostgreSQL and Neo4j containers"
docker compose -f $ComposeFile up -d postgres neo4j
if ($LASTEXITCODE -ne 0) {
    throw "Failed to start Docker containers"
}

Wait-PostgresHealthy
Run-Migrations
Run-Seeds
Seed-AdminUser

Write-Log "Setup complete"
Write-Host ""
Write-Host "  PostgreSQL : localhost:5432"
Write-Host "  Neo4j      : http://localhost:7474"
Write-Host "  Admin      : $($(if ($env:ADMIN_EMAIL) { $env:ADMIN_EMAIL } else { 'admin@transitops.local' }))"
Write-Host ""
Write-Host "  Run health check: docker exec transitops-postgres pg_isready -U transitops"
