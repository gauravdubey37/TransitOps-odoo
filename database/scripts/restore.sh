#!/usr/bin/env bash
# TransitOps database restore script

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

BACKUP_FILE="${1:-}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-transitops}"
POSTGRES_USER="${POSTGRES_USER:-transitops}"
export PGPASSWORD="${POSTGRES_PASSWORD:-transitops_dev}"

log() {
    echo "[restore] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

if [ -z "${BACKUP_FILE}" ]; then
    log "ERROR Usage: restore.sh <backup-file.sql.gz>"
    exit 1
fi

if [ ! -f "${BACKUP_FILE}" ]; then
    log "ERROR Backup file not found: ${BACKUP_FILE}"
    exit 1
fi

log "Restoring PostgreSQL from ${BACKUP_FILE}"
gunzip -c "${BACKUP_FILE}" | psql -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -v ON_ERROR_STOP=1
log "Restore complete"
