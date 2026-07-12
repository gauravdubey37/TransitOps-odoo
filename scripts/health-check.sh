#!/usr/bin/env bash
# TransitOps - Health check for all services

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

ERRORS=0

check() {
    local name="$1"
    local status="$2"
    if [ "${status}" -eq 0 ]; then
        printf "  %-20s %s\n" "${name}" "OK"
    else
        printf "  %-20s %s\n" "${name}" "FAIL"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "TransitOps Health Check"
echo "========================"

# PostgreSQL
pg_isready -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" >/dev/null 2>&1
check "PostgreSQL" $?

# Neo4j
if command -v curl >/dev/null 2>&1; then
    NEO4J_HTTP_PORT="${NEO4J_HTTP_PORT:-7474}"
    curl -sf "http://localhost:${NEO4J_HTTP_PORT}" >/dev/null 2>&1
    check "Neo4j" $?
else
    docker inspect --format='{{.State.Health.Status}}' transitops-neo4j 2>/dev/null | grep -q healthy
    check "Neo4j" $?
fi

check_optional() {
    local name="$1"
    local status="$2"
    if [ "${status}" -eq 0 ]; then
        printf "  %-20s %s\n" "${name}" "OK"
    else
        printf "  %-20s %s\n" "${name}" "SKIP (not running)"
    fi
}

# Application services (optional until backend/frontend/analytics branches are merged)
BACKEND_PORT="${BACKEND_PORT:-5001}"
curl -sf "http://localhost:${BACKEND_PORT}/api/v1/health" >/dev/null 2>&1
check_optional "Backend" $?

ANALYTICS_PORT="${ANALYTICS_PORT:-8000}"
curl -sf "http://localhost:${ANALYTICS_PORT}/health/" >/dev/null 2>&1
check_optional "Analytics" $?

FRONTEND_PORT="${FRONTEND_PORT:-3000}"
curl -sf "http://localhost:${FRONTEND_PORT}" >/dev/null 2>&1
check_optional "Frontend" $?

echo "========================"
if [ "${ERRORS}" -gt 0 ]; then
    echo "Health check FAILED: ${ERRORS} required service(s) unavailable"
    exit 1
fi
echo "Required services healthy"
