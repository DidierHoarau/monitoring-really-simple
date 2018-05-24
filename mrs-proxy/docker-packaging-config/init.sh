#/bin/bash

if [ "$npm_package_name" = "" ]; then
  echo "Error: This script should only be called from NPM"
  exit 1
fi

set -e

rm -fr ./docker-packaging

cp -R ../docker-packaging .
