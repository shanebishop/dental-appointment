#!/usr/bin/env sh

# First, cd to cucumber so the setup.cfg and evironment.py are in
# the working directory
cd cucumber || { echo 'Failed to cd to cucumber directory.'; exit 1; }

# Run the cucumber features, and exit with same exit code as behave
behave features
exit "$?"
