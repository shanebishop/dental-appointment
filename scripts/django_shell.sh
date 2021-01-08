#!/usr/bin/env sh
echo 'To access Django user model, use "from django.contrib.auth.models import User"'
set -x
docker exec -it backend python3 backend/manage.py shell
exit $?
