#!/usr/bin/env sh
set -x

docker exec backend python3 backend/manage.py test --no-input accounts
