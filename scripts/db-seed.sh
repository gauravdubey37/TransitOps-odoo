#!/usr/bin/env bash
# TransitOps - Load seed data

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "${SCRIPT_DIR}/../database/scripts/seed.sh"
