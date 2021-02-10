#!/usr/bin/env sh
#
# Runs eslint, a linter for JavaScript.

docker exec frontend npm run lint
exit "$?"
