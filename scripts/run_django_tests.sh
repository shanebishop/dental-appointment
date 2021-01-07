#!/usr/bin/env sh
set -x

if [ -n "$1" ]; then
    docker exec backend python3 backend/manage.py test --no-input "$1"
else
    docker exec backend python3 backend/manage.py test --no-input accounts appointments
fi
