#!/usr/bin/env bash
# TransitOps - Restore database from backup

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "${SCRIPT_DIR}/../database/scripts/restore.sh" "$@"
