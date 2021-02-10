#!/usr/bin/env sh
#
# Convenience script for launching a Django shell, where database queries can
# be executed. The backend Docker container must be running before running this
# script.

echo 'To access Django user model, use "from django.contrib.auth.models import User"'
echo
set -x
docker exec -it backend python3 backend/manage.py shell
exit $?
