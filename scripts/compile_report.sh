#!/usr/bin/env sh

[ -f report.mom ] || cd report || { echo 'cd failed.'; exit 1; }
[ -f report.mom ] || { echo "report.mom not found in $(pwd)."; exit 1; }

# Compile to PDF
# First, create PS
# groff -Tps -mom report.mom > report.ps || exit "$?" # Cannot use -Tps if we want automatic relocation
pdfmom report.mom > report.pdf || exit "$?"
# Then, move the table of contents where it belongs, and generate PDF
# What the -p argument is saying:
# 1 - the first page of the document
# _1 - the last page of the document
# 2-_2 - the second page of the document to the second last page of the document
# psselect -p 1,_1,2-_2 report.ps | ps2pdf - report.pdf || exit "$?"

# If evince is not running, start evince
command -v evince > /dev/null 2>&1 && {
    pgrep evince > /dev/null 2>&1
    [ "$?" -eq 1 ] && nohup evince report.pdf > /dev/null 2>&1 &
}
