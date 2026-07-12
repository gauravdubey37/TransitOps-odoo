# TransitOps

Fleet management and transit operations platform.

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd TransitOps-odoo

# Configure environment
cp .env.example .env

# Start infrastructure services (PostgreSQL + Neo4j)
./scripts/start.sh

# Run database migrations
./scripts/db-migrate.sh

# Load seed data
./scripts/db-seed.sh
```

## Architecture

TransitOps is a modular monolith with intelligent services:

| Layer | Technology | Port |
|-------|-----------|------|
| Frontend | Next.js / React | 3000 |
| Backend | Node.js / Express | 5001 |
| Analytics | Python / FastAPI | 8000 |
| PostgreSQL | PostgreSQL 16 | 5432 |
| Neo4j | Neo4j 5 | 7687 / 7474 |

## Development Branches

| Branch | Responsibility |
|--------|---------------|
| `frontend` | React UI, dashboards, driver app |
| `backend` | REST API, business logic, auth |
| `analytics` | Neo4j analytics, NLP, recommendations |
| `infrastructure` | Docker, database, CI/CD, scripts |

## Documentation

All project documentation is in the `docs/` directory:

- `docs/00_Project/` — Vision, tech stack, roadmap
- `docs/01_Architecture/` — System design, folder structure
- `docs/03_Database/` — Schema, migrations, seed data
- `docs/07_Development/` — Git workflow, commit conventions

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/start.sh` | Start all Docker services |
| `scripts/stop.sh` | Stop all Docker services |
| `scripts/db-migrate.sh` | Run PostgreSQL migrations |
| `scripts/db-seed.sh` | Load seed data |
| `scripts/db-backup.sh` | Backup databases |
| `scripts/health-check.sh` | Verify service health |

## License

See [LICENSE](LICENSE).
