#!/usr/bin/env sh
set -ex

[ -f manage.py ] || cd backend
[ -f manage.py ] || { echo 'manage.py not found in $(pwd). Aborting'; exit 1; }

rm -f apps/*/migrations/*_initial.py apps/*/migrations/*_auto_*.py
python3 manage.py collectstatic --no-input
python3 manage.py makemigrations
python3 manage.py migrate
# TODO Remove the echo, as initadmin always needs to work
python3 manage.py initadmin || echo 'initadmin failed'
python3 manage.py runserver 0.0.0.0:8000