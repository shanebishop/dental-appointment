#!/usr/bin/env sh
docker exec frontend npm run lint
exit "$?"
