#!/bin/sh
npm --version
echo test
DIR=build
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing Lock ($DIR)"
    rm -rf "$DIR"
fi
npm install
truffle compile
truffle migrate --reset
