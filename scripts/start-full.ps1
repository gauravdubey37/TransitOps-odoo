# TransitOps - Full stack startup (Windows)
# Bootstraps databases, then starts all Docker services.

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$EnvFile = Join-Path $ProjectRoot ".env"
$EnvExample = Join-Path $ProjectRoot ".env.example"
$ComposeBase = Join-Path $ProjectRoot "docker\docker-compose.yml"
$ComposeDev = Join-Path $ProjectRoot "docker\docker-compose.dev.yml"

function Write-Log($Message) {
    Write-Host "[start-full] $Message"
}

if (-not (Test-Path $EnvFile)) {
    Copy-Item $EnvExample $EnvFile
    Write-Log "Created .env from .env.example"
}

Write-Log "Bootstrapping PostgreSQL and seed data..."
& (Join-Path $ProjectRoot "scripts\setup.ps1")

Write-Log "Starting full Docker stack..."
docker compose -f $ComposeBase -f $ComposeDev up -d --build

Write-Log "Waiting for services to start..."
Start-Sleep -Seconds 15
docker compose -f $ComposeBase -f $ComposeDev ps

Write-Log "Full stack startup complete"
Write-Host ""
Write-Host "  Frontend  : http://localhost:3000"
Write-Host "  Backend   : http://localhost:5001/api/v1/health"
Write-Host "  Analytics : http://localhost:8000/health/"
Write-Host "  Admin     : admin@transitops.local / changeme"
