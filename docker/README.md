# TransitOps Docker Configuration

This directory contains all Docker-related configuration for TransitOps.

## Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Base compose configuration |
| `docker-compose.dev.yml` | Development overrides (hot reload) |
| `docker-compose.prod.yml` | Production configuration |
| `Dockerfile.backend` | Backend API container |
| `Dockerfile.frontend` | Frontend application container |
| `Dockerfile.analytics` | Analytics engine container |
| `postgres/init.sql` | PostgreSQL initialization |
| `neo4j/neo4j.conf` | Neo4j configuration |

## Usage

```bash
# Start all services (development)
docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d

# Start databases only
docker compose -f docker/docker-compose.yml up -d postgres neo4j

# Stop all services
docker compose -f docker/docker-compose.yml down
```

## Ports

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend | 5001 |
| Analytics | 8000 |
| PostgreSQL | 5432 |
| Neo4j Bolt | 7687 |
| Neo4j Browser | 7474 |
