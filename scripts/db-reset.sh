#!/usr/bin/env bash
# TransitOps - Reset database (drop and recreate)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-transitops}"
POSTGRES_USER="${POSTGRES_USER:-transitops}"
export PGPASSWORD="${POSTGRES_PASSWORD:-transitops_dev}"

echo "[db-reset] WARNING: This will drop and recreate the database '${POSTGRES_DB}'"
read -r -p "Are you sure? (yes/no): " confirm

if [ "${confirm}" != "yes" ]; then
    echo "[db-reset] Aborted"
    exit 0
fi

echo "[db-reset] Dropping database..."
psql -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d postgres \
    -c "DROP DATABASE IF EXISTS ${POSTGRES_DB};"

echo "[db-reset] Creating database..."
psql -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d postgres \
    -c "CREATE DATABASE ${POSTGRES_DB};"

echo "[db-reset] Running migrations..."
bash "${SCRIPT_DIR}/db-migrate.sh"

echo "[db-reset] Loading seed data..."
bash "${SCRIPT_DIR}/db-seed.sh"

echo "[db-reset] Done"
