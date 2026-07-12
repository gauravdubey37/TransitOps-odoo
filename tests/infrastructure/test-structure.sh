#!/usr/bin/env bash
# TransitOps infrastructure test runner

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "=== Infrastructure Tests ==="
PASS=0
FAIL=0

test_file_exists() {
    local file="$1"
    if [ -f "${PROJECT_ROOT}/${file}" ]; then
        echo "  PASS: ${file} exists"
        PASS=$((PASS + 1))
    else
        echo "  FAIL: ${file} missing"
        FAIL=$((FAIL + 1))
    fi
}

test_dir_exists() {
    local dir="$1"
    if [ -d "${PROJECT_ROOT}/${dir}" ]; then
        echo "  PASS: ${dir}/ exists"
        PASS=$((PASS + 1))
    else
        echo "  FAIL: ${dir}/ missing"
        FAIL=$((FAIL + 1))
    fi
}

echo ""
echo "File structure tests:"
test_file_exists ".env.example"
test_file_exists ".gitignore"
test_file_exists "docker/docker-compose.yml"
test_file_exists "docker/docker-compose.dev.yml"
test_file_exists "database/scripts/migrate.sh"
test_file_exists "database/scripts/seed.sh"
test_file_exists "scripts/start.sh"
test_file_exists "scripts/health-check.sh"

echo ""
echo "Directory structure tests:"
test_dir_exists "database/migrations/postgres"
test_dir_exists "database/migrations/neo4j"
test_dir_exists "database/seed/development"
test_dir_exists "database/backup"
test_dir_exists ".github/workflows"

echo ""
echo "Migration count test:"
MIGRATION_COUNT=$(find "${PROJECT_ROOT}/database/migrations/postgres" -name "*.sql" | wc -l)
if [ "${MIGRATION_COUNT}" -ge 29 ]; then
    echo "  PASS: ${MIGRATION_COUNT} migrations found"
    PASS=$((PASS + 1))
else
    echo "  FAIL: Expected >= 29 migrations, found ${MIGRATION_COUNT}"
    FAIL=$((FAIL + 1))
fi

echo ""
echo "Rollback parity test:"
for f in "${PROJECT_ROOT}"/database/migrations/postgres/*.sql; do
    base=$(basename "$f" .sql)
    if [ -f "${PROJECT_ROOT}/database/migrations/rollbacks/postgres/${base}.sql" ]; then
        PASS=$((PASS + 1))
    else
        echo "  FAIL: Missing rollback for ${base}"
        FAIL=$((FAIL + 1))
    fi
done

echo ""
echo "=== Results: ${PASS} passed, ${FAIL} failed ==="
if [ "${FAIL}" -gt 0 ]; then
    exit 1
fi
