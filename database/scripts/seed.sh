#!/usr/bin/env bash
# TransitOps seed data loader

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

SEED_PROFILE="${SEED_PROFILE:-development}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-transitops}"
POSTGRES_USER="${POSTGRES_USER:-transitops}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@transitops.local}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-changeme}"
export PGPASSWORD="${POSTGRES_PASSWORD:-transitops_dev}"

PSQL="psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -v ON_ERROR_STOP=1"

log() {
    echo "[seed] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

seed_admin_user() {
    log "Creating admin user (${ADMIN_EMAIL})"
    ${PSQL} -q <<SQL
INSERT INTO users (user_id, full_name, email, password_hash, role_id, is_active)
VALUES (
    'u0000000-0000-4000-8000-000000000001',
    'System Administrator',
    '${ADMIN_EMAIL}',
    crypt('${ADMIN_PASSWORD}', gen_salt('bf', 10)),
    'a0000000-0000-4000-8000-000000000001',
    TRUE
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = crypt('${ADMIN_PASSWORD}', gen_salt('bf', 10)),
    updated_at = NOW();
SQL
}

run_seed_files() {
    local seed_dir="${PROJECT_ROOT}/database/seed/${SEED_PROFILE}"

    if [ ! -d "${seed_dir}" ]; then
        log "ERROR Seed profile '${SEED_PROFILE}' not found at ${seed_dir}"
        exit 1
    fi

    local files
    files=$(find "${seed_dir}" -name "*.sql" -type f | sort)

    while IFS= read -r file; do
        [ -n "${file}" ] || continue
        log "RUN $(basename "${file}")"
        ${PSQL} -f "${file}"
    done <<< "${files}"
}

log "Starting seed (profile: ${SEED_PROFILE})"
run_seed_files
seed_admin_user
log "Seed complete"
