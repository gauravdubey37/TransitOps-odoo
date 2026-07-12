#!/usr/bin/env bash
# TransitOps Neo4j migration runner

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
MIGRATIONS_DIR="${PROJECT_ROOT}/database/migrations/neo4j"

if [ -f "${PROJECT_ROOT}/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "${PROJECT_ROOT}/.env"
    set +a
fi

NEO4J_HOST="${NEO4J_HOST:-localhost}"
NEO4J_BOLT_PORT="${NEO4J_BOLT_PORT:-7687}"
NEO4J_USER="${NEO4J_USER:-neo4j}"
NEO4J_PASSWORD="${NEO4J_PASSWORD:-transitops_dev}"

log() {
    echo "[neo4j-migrate] $(date -u +"%Y-%m-%dT%H:%M:%SZ") $*"
}

run_cypher_file() {
    local file="$1"
    local filename
    filename=$(basename "${file}")
    log "APPLY ${filename}"

    if command -v cypher-shell >/dev/null 2>&1; then
        cypher-shell -a "bolt://${NEO4J_HOST}:${NEO4J_BOLT_PORT}" \
            -u "${NEO4J_USER}" -p "${NEO4J_PASSWORD}" \
            -f "${file}"
    else
        log "WARN cypher-shell not found, skipping ${filename}"
        log "      Run manually or use Docker: docker exec transitops-neo4j cypher-shell -f /migrations/${filename}"
    fi
}

files=$(find "${MIGRATIONS_DIR}" -name "*.cypher" -type f | sort)

if [ -z "${files}" ]; then
    log "No migration files found"
    exit 0
fi

while IFS= read -r file; do
    [ -n "${file}" ] && run_cypher_file "${file}"
done <<< "${files}"

log "Neo4j migrations complete"
