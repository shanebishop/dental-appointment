#!/usr/bin/env bash
#
# Compiles report using groff (specifically the pdfmom wrapper around groff.)
# For more details, see report/README.md.

[ -f "$HOME/pdf-link.tmac" ] || cp pdf-link.tmac "$HOME"

[ -f report.mom ] || cd report || { echo 'cd failed.'; exit 1; }
[ -f report.mom ] || { echo "report.mom not found in $(pwd)."; exit 1; }

# Compile to PDF
# -t means compile with table support
# The pdfmom(1) man page says that the warning below can be ignored,
# so we use grep to filter it out, based on https://stackoverflow.com/a/52575087/8593689
pdfmom -t report.mom > report.pdf \
    2> >(grep -v "can't transparently output node at top level" >&2)
rc="$?"
[ "$rc" -eq 0 ] || { echo; echo "pdfmom had $rc exit code."; exit "$rc"; }

# If evince is not running, start evince
command -v evince > /dev/null 2>&1 && {
    pgrep evince > /dev/null 2>&1
    [ "$?" -eq 1 ] && nohup evince report.pdf > /dev/null 2>&1 &
}
