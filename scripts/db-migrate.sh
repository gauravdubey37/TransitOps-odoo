#!/usr/bin/env bash
# TransitOps - Run database migrations

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "${SCRIPT_DIR}/../database/scripts/migrate.sh" "${@:-migrate}"
