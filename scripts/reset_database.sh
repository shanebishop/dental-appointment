#!/usr/bin/env sh
set -e

RESET_PY_SCRIPT="${1:-scripts/reset_database.py}"

[ -f "$RESET_PY_SCRIPT" ] || {
    echo "reset_database.py not found at $RESET_PY_SCRIPT."
    exit 1
}

docker exec -i backend python3 backend/manage.py shell < "$RESET_PY_SCRIPT"
exit "$?"
