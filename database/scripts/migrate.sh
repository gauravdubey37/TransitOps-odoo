#!/usr/bin/env bash
# TransitOps PostgreSQL migration runner
# Applies pending migrations in order and records them in schema_migrations

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
MIGRATIONS_DIR="${PROJECT_ROOT}/database/migrations/postgres"
ROLLBACKS_DIR="${PROJECT_ROOT}/database/migrations/rollbacks/postgres"

# Load environment variables
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

PSQL="psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -v ON_ERROR_STOP=1"

log() {
    echo "[migrate] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

ensure_migrations_table() {
    ${PSQL} -q <<'SQL'
CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    checksum TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    execution_time_ms INTEGER,
    success BOOLEAN NOT NULL DEFAULT TRUE
);
SQL
}

get_checksum() {
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "$1" | awk '{print $1}'
    elif command -v shasum >/dev/null 2>&1; then
        shasum -a 256 "$1" | awk '{print $1}'
    else
        echo "unknown"
    fi
}

is_applied() {
    local version="$1"
    local count
    count=$(${PSQL} -t -A -c "SELECT COUNT(*) FROM schema_migrations WHERE version = '${version}' AND success = TRUE;")
    [ "${count}" -gt 0 ]
}

apply_migration() {
    local file="$1"
    local filename
    filename=$(basename "${file}")
    local version="${filename%.sql}"
    local checksum
    checksum=$(get_checksum "${file}")

    if is_applied "${version}"; then
        log "SKIP  ${filename} (already applied)"
        return 0
    fi

    log "APPLY ${filename}"
    local start_time
    start_time=$(date +%s%3N 2>/dev/null || date +%s)

    ${PSQL} -f "${file}"

    local end_time
    end_time=$(date +%s%3N 2>/dev/null || date +%s)
    local duration=$((end_time - start_time))

    ${PSQL} -q -c "INSERT INTO schema_migrations (version, filename, checksum, execution_time_ms, success) VALUES ('${version}', '${filename}', '${checksum}', ${duration}, TRUE) ON CONFLICT (version) DO NOTHING;"

    log "DONE  ${filename} (${duration}ms)"
}

rollback_migration() {
    local version="$1"
    local rollback_file="${ROLLBACKS_DIR}/${version}.sql"

    if [ ! -f "${rollback_file}" ]; then
        log "ERROR No rollback file for ${version}"
        return 1
    fi

    if ! is_applied "${version}"; then
        log "SKIP  ${version} (not applied)"
        return 0
    fi

    log "ROLLBACK ${version}"
    ${PSQL} -f "${rollback_file}"
    ${PSQL} -q -c "DELETE FROM schema_migrations WHERE version = '${version}';"
    log "DONE  ${version}"
}

run_migrate() {
    ensure_migrations_table

    local files
    files=$(find "${MIGRATIONS_DIR}" -name "*.sql" -type f | sort)

    if [ -z "${files}" ]; then
        log "No migration files found"
        return 0
    fi

    while IFS= read -r file; do
        [ -n "${file}" ] && apply_migration "${file}"
    done <<< "${files}"

    log "All migrations complete"
}

run_rollback() {
    local version="${1:-}"
    if [ -z "${version}" ]; then
        log "ERROR Usage: migrate.sh rollback <version>"
        exit 1
    fi
    rollback_migration "${version}"
}

run_status() {
    ensure_migrations_table
    log "Migration status:"
    ${PSQL} -c "SELECT version, filename, applied_at, execution_time_ms FROM schema_migrations ORDER BY version;"
}

case "${1:-migrate}" in
    migrate)
        run_migrate
        ;;
    rollback)
        run_rollback "${2:-}"
        ;;
    status)
        run_status
        ;;
    *)
        echo "Usage: migrate.sh [migrate|rollback <version>|status]"
        exit 1
        ;;
esac
