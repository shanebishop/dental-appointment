#!/usr/bin/env sh
#
# Runs JavaScript unit tests.

docker exec frontend npm run test
exit "$?"
