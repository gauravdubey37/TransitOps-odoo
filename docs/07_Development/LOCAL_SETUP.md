# TransitOps Local Setup Guide

Version: 1.0

Status: Implementation Guide

Last Updated: 2026-07-12

---

# Purpose

This guide describes how to run TransitOps infrastructure locally on **Windows**, **macOS**, or **Linux**.

The recommended approach uses **Docker** for PostgreSQL and Neo4j. You do not need to install databases manually on your machine.

---

# Prerequisites

| Tool | Required | Notes |
|------|----------|-------|
| Docker Desktop | Yes | PostgreSQL 16 + Neo4j 5 run in containers |
| Git | Yes | Clone the repository |
| PowerShell | Windows | For `scripts/setup.ps1` |
| Git Bash or WSL | Optional | For `.sh` scripts on Windows |

Backend, frontend, and analytics application code live on separate branches. Use the **`integration`** branch to run the full stack locally with Docker.

---

# Quick Start — Full Stack (integration branch)

Open PowerShell in the project root on the `integration` branch:

```powershell
.\scripts\start-full.ps1
```

This runs database bootstrap (`setup.ps1`) then starts backend, frontend, analytics, PostgreSQL, and Neo4j via Docker.

**Manual two-step alternative:**

```powershell
copy .env.example .env
.\scripts\setup.ps1
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d --build
```

Default admin login:

| Field | Value |
|-------|-------|
| Email | `admin@transitops.local` |
| Password | Value of `ADMIN_PASSWORD` in `.env` (default: `changeme`) |

---

# Quick Start — Databases Only

Open PowerShell in the project root and run:

```powershell
.\scripts\setup.ps1
```

This single command will:

1. Create `.env` from `.env.example` (if missing)
2. Start PostgreSQL and Neo4j containers
3. Wait for databases to become healthy
4. Run all PostgreSQL migrations
5. Load development seed data
6. Create the default admin user

Default admin login after setup:

| Field | Value |
|-------|-------|
| Email | `admin@transitops.local` |
| Password | Value of `ADMIN_PASSWORD` in `.env` (default: `changeme`) |

---

# Quick Start (macOS / Linux)

```bash
cp .env.example .env
./scripts/start.sh db
./scripts/db-migrate.sh
./scripts/db-seed.sh
./scripts/health-check.sh
```

---

# Environment Configuration

Copy the template once:

```powershell
copy .env.example .env
```

## Docker setup (default)

When using Docker, database containers expose ports to your machine. Use these values in `.env` when running migration or seed scripts **from your host** (outside containers):

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://transitops:transitops_dev@localhost:5432/transitops
NEO4J_HOST=localhost
NEO4J_URI=bolt://localhost:7687
```

The `setup.ps1` script handles this automatically.

## Optional changes

| Variable | Purpose |
|----------|---------|
| `ADMIN_EMAIL` | Default administrator email |
| `ADMIN_PASSWORD` | Default administrator password |
| `JWT_SECRET` | Change for non-local environments |
| `VITE_API_URL` | Frontend API base URL (default: `http://localhost:5001/api/v1`) |
| `PORT` | Backend listen port (default: `5001`) |
| `SEED_PROFILE` | `development` (default), `demo`, `testing` |

Never commit `.env` to version control.

---

# Manual Docker Commands

Start databases only:

```powershell
docker compose -f docker/docker-compose.yml up -d postgres neo4j
```

Start full stack (after `setup.ps1`):

```powershell
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d --build
```

Stop all services:

```powershell
docker compose -f docker/docker-compose.yml down
```

View logs:

```powershell
docker compose -f docker/docker-compose.yml logs -f postgres
```

Check container status:

```powershell
docker compose -f docker/docker-compose.yml ps
```

---

# Service URLs

| Service | URL | Health check |
|---------|-----|--------------|
| PostgreSQL | `localhost:5432` | `pg_isready` |
| Neo4j Browser | `http://localhost:7474` | — |
| Neo4j Bolt | `bolt://localhost:7687` | — |
| Backend API | `http://localhost:5001/api/v1` | `GET /api/v1/health` |
| Analytics API | `http://localhost:8000` | `GET /health/` |
| Frontend | `http://localhost:3000` | HTTP 200 on `/` |

---

# Database Scripts

| Script | Platform | Description |
|--------|----------|-------------|
| `scripts/setup.ps1` | Windows | Database bootstrap (migrations + seed) |
| `scripts/start-full.ps1` | Windows | Full stack: bootstrap + all Docker services |
| `scripts/start.sh` | Bash | Start Docker services |
| `scripts/stop.sh` | Bash | Stop Docker services |
| `scripts/db-migrate.sh` | Bash | Run PostgreSQL migrations |
| `scripts/db-seed.sh` | Bash | Load seed data |
| `scripts/db-reset.sh` | Bash | Drop, recreate, migrate, seed |
| `scripts/db-backup.sh` | Bash | Backup PostgreSQL |
| `scripts/health-check.sh` | Bash | Verify service health |
| `database/scripts/migrate.sh` | Bash | Migration runner (used internally) |
| `database/scripts/seed.sh` | Bash | Seed loader (used internally) |
| `database/scripts/validate.sh` | Bash | Schema validation |
| `database/scripts/neo4j-migrate.sh` | Bash | Neo4j constraints and indexes |

---

# Verify Installation

After setup, confirm PostgreSQL is running:

```powershell
docker exec transitops-postgres psql -U transitops -d transitops -c "SELECT COUNT(*) FROM roles;"
```

Expected result: `5` roles.

Confirm migrations applied:

```powershell
docker exec transitops-postgres psql -U transitops -d transitops -c "SELECT COUNT(*) FROM schema_migrations;"
```

Expected result: `29` migrations.

## Full stack health checks

```powershell
curl http://localhost:5001/api/v1/health
curl http://localhost:8000/health/
curl http://localhost:3000
```

Or use Git Bash / WSL:

```bash
./scripts/health-check.sh
```

# Troubleshooting

## Docker Desktop not running

```
error during connect: open //./pipe/dockerDesktopLinuxEngine
```

Start Docker Desktop and wait until it is fully running, then retry.

## Port already in use

If port `5432` or `7474` is taken, change `POSTGRES_PORT` or `NEO4J_HTTP_PORT` in `.env` and update `docker-compose.dev.yml` port mappings.

## Migrations fail on fresh install

Ensure containers are healthy before migrating:

```powershell
docker exec transitops-postgres pg_isready -U transitops
```

## Reset everything

```powershell
docker compose -f docker/docker-compose.yml down -v
.\scripts\setup.ps1
```

The `-v` flag removes persistent volumes and gives you a clean database.

---

# Related Documentation

- `docs/03_Database/MIGRATIONS.md` — Migration strategy and file list
- `docs/03_Database/SEED_DATA.md` — Seed data specification
- `docker/README.md` — Docker configuration details
- `docs/07_Development/GIT_WORKFLOW.md` — Branch workflow

---

# End of Document
