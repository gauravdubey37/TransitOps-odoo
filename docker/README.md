# TransitOps Docker Configuration

This directory contains all Docker-related configuration for TransitOps.

## Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Base compose configuration (postgres, neo4j) |
| `docker-compose.dev.yml` | Development overrides (backend, frontend, analytics) |
| `docker-compose.prod.yml` | Production configuration |
| `Dockerfile.backend` | Backend API container |
| `Dockerfile.frontend` | Frontend application container (Vite dev server) |
| `Dockerfile.analytics` | Analytics engine container |
| `postgres/init.sql` | PostgreSQL initialization |
| `neo4j/neo4j.conf` | Neo4j configuration |

## Usage

**Windows — full stack (recommended on `integration` branch):**

```powershell
.\scripts\start-full.ps1
```

**Databases only:**

```powershell
.\scripts\setup.ps1
```

**Start databases only:**

```bash
docker compose -f docker/docker-compose.yml up -d postgres neo4j
```

**Start all services (development):**

```powershell
# Run setup first on first install
.\scripts\setup.ps1
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d --build
```

**Stop all services:**

```bash
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down
```

See `docs/07_Development/LOCAL_SETUP.md` for complete setup instructions.

## Ports

| Service | Host port | Container port |
|---------|-----------|----------------|
| Frontend (Vite) | 3000 | 3000 |
| Backend (Express) | 5001 | 5001 |
| Analytics (FastAPI) | 8000 | 8000 |
| PostgreSQL | 5432 | 5432 |
| Neo4j Bolt | 7687 | 7687 |
| Neo4j Browser | 7474 | 7474 |

## Health endpoints

| Service | Endpoint |
|---------|----------|
| Backend | `GET http://localhost:5001/api/v1/health` |
| Analytics | `GET http://localhost:8000/health/` |
| Frontend | `GET http://localhost:3000` |

## Environment variables (compose)

| Variable | Used by | Notes |
|----------|---------|-------|
| `DATABASE_URL` | Backend | Postgres connection inside Docker network |
| `POSTGRES_URI` | Analytics | Postgres connection inside Docker network |
| `VITE_API_URL` | Frontend | Browser-facing API URL (default `http://localhost:5001/api/v1`) |
| `JWT_SECRET` | Backend | Required for auth |
| `PORT` | Backend | Set to `5001` in dev compose |

The frontend Docker image runs `npm run dev:docker` (Vite only). It does **not** start the json-server mock API used by local `npm run dev`.
