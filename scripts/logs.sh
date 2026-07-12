#!/usr/bin/env bash
# TransitOps - View service logs

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_DIR="${PROJECT_ROOT}/docker"
SERVICE="${1:-}"

if [ -n "${SERVICE}" ]; then
    docker compose -f "${COMPOSE_DIR}/docker-compose.yml" logs -f "${SERVICE}"
else
    docker compose -f "${COMPOSE_DIR}/docker-compose.yml" logs -f
fi
