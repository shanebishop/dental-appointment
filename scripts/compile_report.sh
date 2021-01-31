#!/usr/bin/env sh

[ -f "$HOME/pdf-link.tmac" ] || cp pdf-link.tmac "$HOME"

[ -f report.mom ] || cd report || { echo 'cd failed.'; exit 1; }
[ -f report.mom ] || { echo "report.mom not found in $(pwd)."; exit 1; }

# Compile to PDF
# -t means compile with table support
pdfmom -t report.mom > report.pdf
rc="$?"
[ "$rc" -eq 0 ] || { echo; echo "pdfmom had $rc exit code."; exit "$rc"; }

# If evince is not running, start evince
command -v evince > /dev/null 2>&1 && {
    pgrep evince > /dev/null 2>&1
    [ "$?" -eq 1 ] && nohup evince report.pdf > /dev/null 2>&1 &
}
