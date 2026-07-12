#!/usr/bin/env bash
# TransitOps database validation script

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

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

PSQL="psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -t -A"

log() {
    echo "[validate] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

ERRORS=0

check_table() {
    local table="$1"
    local count
    count=$(${PSQL} -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${table}';")
    if [ "${count}" -eq 0 ]; then
        log "FAIL Table '${table}' does not exist"
        ERRORS=$((ERRORS + 1))
    else
        log "OK   Table '${table}' exists"
    fi
}

check_extension() {
    local ext="$1"
    local count
    count=$(${PSQL} -c "SELECT COUNT(*) FROM pg_extension WHERE extname = '${ext}';")
    if [ "${count}" -eq 0 ]; then
        log "FAIL Extension '${ext}' not enabled"
        ERRORS=$((ERRORS + 1))
    else
        log "OK   Extension '${ext}' enabled"
    fi
}

log "Validating PostgreSQL schema"

check_extension "uuid-ossp"
check_extension "pgcrypto"

TABLES=(
    roles users regions depots drivers vehicles routes trips
    fuel_logs trip_expenses maintenance_records notifications
    system_settings audit_logs schema_migrations
)

for table in "${TABLES[@]}"; do
    check_table "${table}"
done

ROLE_COUNT=$(${PSQL} -c "SELECT COUNT(*) FROM roles;")
log "INFO Roles: ${ROLE_COUNT}"

if [ "${ERRORS}" -gt 0 ]; then
    log "Validation FAILED with ${ERRORS} error(s)"
    exit 1
fi

log "Validation PASSED"
