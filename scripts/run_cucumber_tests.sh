#!/usr/bin/env sh
#
# Runs cucumber acceptance tests.
# To only run a specific feature file, provide the path to the feature file
# as the first argument to this script.

# First, cd to cucumber so the setup.cfg and evironment.py are in
# the working directory
cd cucumber || { echo 'Failed to cd to cucumber directory.'; exit 1; }

to_run=features
[ -n "$1" ] && {
    to_run="$to_run/$(basename "$1")"
    echo "Only running $to_run"
}

# Run the cucumber features, and exit with same exit code as behave
behave "$to_run"
exit "$?"
