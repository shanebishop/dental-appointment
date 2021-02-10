#!/usr/bin/env sh
#
# Runs Django/API tests.
# To only run a file's tests, provide the path to the feature file
# as the first argument to this script.
set -x

if [ -n "$1" ]; then
    docker exec backend python3 backend/manage.py test --no-input "$1"
else
    docker exec backend python3 backend/manage.py test --no-input accounts appointments
fi
