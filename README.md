# TransitOps

Fleet management and transit operations platform.

## Quick Start

### Windows (recommended)

```powershell
cd TransitOps-odoo
.\scripts\setup.ps1
```

This starts PostgreSQL + Neo4j in Docker, runs migrations, loads seed data, and creates the admin user.

Default login: `admin@transitops.local` / `changeme` (or your `ADMIN_PASSWORD` in `.env`)

### macOS / Linux

```bash
git clone <repository-url>
cd TransitOps-odoo
cp .env.example .env
./scripts/start.sh db
./scripts/db-migrate.sh
./scripts/db-seed.sh
```

See [Local Setup Guide](docs/07_Development/LOCAL_SETUP.md) for full instructions and troubleshooting.

## Architecture

TransitOps is a modular monolith with intelligent services:

| Layer | Technology | Port | Status |
|-------|-----------|------|--------|
| Frontend | Next.js / React | 3000 | Pending |
| Backend | Node.js / Express | 5001 | Pending |
| Analytics | Python / FastAPI | 8000 | Pending |
| PostgreSQL | PostgreSQL 16 | 5432 | Ready |
| Neo4j | Neo4j 5 | 7687 / 7474 | Ready |

## Development Branches

| Branch | Responsibility |
|--------|---------------|
| `frontend` | React UI, dashboards, driver app |
| `backend` | REST API, business logic, auth |
| `analytics` | Neo4j analytics, NLP, recommendations |
| `infrastructure` | Docker, database, CI/CD, scripts |

## Documentation

| Document | Description |
|----------|-------------|
| [Local Setup](docs/07_Development/LOCAL_SETUP.md) | Windows / Docker setup guide |
| [Migrations](docs/03_Database/MIGRATIONS.md) | Database migration strategy and file list |
| [Seed Data](docs/03_Database/SEED_DATA.md) | Seed data specification |
| [Git Workflow](docs/07_Development/GIT_WORKFLOW.md) | Branch and commit conventions |
| [Architecture](docs/01_Architecture/ARCHITECTURE.md) | System design |

## Scripts

| Script | Platform | Description |
|--------|----------|-------------|
| `scripts/setup.ps1` | Windows | One-command full setup |
| `scripts/start.sh` | Bash | Start Docker services |
| `scripts/stop.sh` | Bash | Stop Docker services |
| `scripts/db-migrate.sh` | Bash | Run PostgreSQL migrations |
| `scripts/db-seed.sh` | Bash | Load seed data |
| `scripts/db-backup.sh` | Bash | Backup databases |
| `scripts/health-check.sh` | Bash | Verify service health |

## License

See [LICENSE](LICENSE).
