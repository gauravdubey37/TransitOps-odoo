#!/usr/bin/env bash
# TransitOps - Start all infrastructure services

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_DIR="${PROJECT_ROOT}/docker"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

MODE="${1:-db}"

case "${MODE}" in
    db)
        echo "[start] Starting database services (PostgreSQL + Neo4j)..."
        docker compose -f "${COMPOSE_DIR}/docker-compose.yml" up -d postgres neo4j
        ;;
    all)
        echo "[start] Starting all services..."
        docker compose -f "${COMPOSE_DIR}/docker-compose.yml" -f "${COMPOSE_DIR}/docker-compose.dev.yml" up -d
        ;;
    *)
        echo "Usage: start.sh [db|all]"
        exit 1
        ;;
esac

echo "[start] Waiting for services to be healthy..."
sleep 5
docker compose -f "${COMPOSE_DIR}/docker-compose.yml" ps
echo "[start] Done"
