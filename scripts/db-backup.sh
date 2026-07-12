#!/usr/bin/env bash
# TransitOps - Backup databases

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "${SCRIPT_DIR}/../database/scripts/backup.sh"
