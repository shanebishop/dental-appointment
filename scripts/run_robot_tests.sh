#!/usr/bin/env bash
#
# This is a script for running robot tests in a local development environment.
#
# Before running this script, the app should be started with the command
# "docker-compose up -d".
#
# Usage:
#
# To run all robot tests:
# $ scripts/run_robot_tests.sh
#
# To run just one robot file:
# $ scripts/run_robot_tests.sh <robot filename without path>
set -eo pipefail

function assert_prog_exists() {
    if ! command -v "$1" > /dev/null; then
        echo "$1 was not found on PATH."
        exit 1
    fi
}

if [ ! -f docker-compose.yml ]; then
    echo 'This script must be run from the root of this project.'
    echo 'I.e., this script must be run like "scripts/run_robot_tests.sh".'
    exit 1
fi

ROOT_DIR="$(pwd)"
robot_tests_passed='no'

set +e
assert_prog_exists curl
assert_prog_exists python3
assert_prog_exists flake8
assert_prog_exists robot
assert_prog_exists firefox
assert_prog_exists geckodriver
set -e

set +e
curl -sS http://localhost/auth/sign-in -o /dev/null
curl_rc=$?
set -e

if [ $curl_rc -ne 0 ]; then
    echo 'The frontend cannot be accessed.'
    echo 'Have you started the portal with "docker-compose -f docker-compose.dev.yml up -d"?'
    exit 1
fi

set -x

flake8

FIREFOX_OPTS='add_argument("--window-size=1420,1080"); add_argument("--headless"); add_argument("--disable-gpu");'
#BROWSER='Headless Firefox'
BROWSER='Firefox'

to_run="$ROOT_DIR/robot"
[ -n "$1" ] && to_run="$to_run/$(basename "$1")"

robot \
  --output NONE \
  --log NONE \
  --report NONE \
  --variable "BROWSER:$BROWSER" \
  --variable "BROWSER OPTS:$FIREFOX_OPTS" \
  "$to_run" && \
  robot_tests_passed='yes'

set +x

echo "Tests passed: $robot_tests_passed"

[ "$robot_tests_passed" = 'yes' ] && exit 0
exit 1
