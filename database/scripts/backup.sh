#!/usr/bin/env bash
# TransitOps database backup script

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

BACKUP_DIR="${BACKUP_DIR:-${PROJECT_ROOT}/database/backup}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-transitops}"
POSTGRES_USER="${POSTGRES_USER:-transitops}"
export PGPASSWORD="${POSTGRES_PASSWORD:-transitops_dev}"

TIMESTAMP=$(date -u +"%Y%m%d_%H%M%S")
mkdir -p "${BACKUP_DIR}"

log() {
    echo "[backup] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

backup_postgres() {
    local output="${BACKUP_DIR}/postgres_${TIMESTAMP}.sql.gz"
    log "Backing up PostgreSQL to ${output}"
    pg_dump -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
        --no-owner --no-acl | gzip > "${output}"
    log "PostgreSQL backup complete"
}

backup_neo4j() {
    if docker ps --format '{{.Names}}' | grep -q '^transitops-neo4j$'; then
        local output="${BACKUP_DIR}/neo4j_${TIMESTAMP}"
        log "Backing up Neo4j to ${output}"
        docker exec transitops-neo4j neo4j-admin database dump neo4j --to-path=/tmp/backup 2>/dev/null || \
            log "WARN Neo4j dump skipped (may require enterprise or different method)"
    else
        log "WARN Neo4j container not running, skipping Neo4j backup"
    fi
}

log "Starting backup"
backup_postgres
backup_neo4j
log "Backup complete"
