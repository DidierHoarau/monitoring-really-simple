#!/bin/bash

set -e

# Libs
npm install

# Web
npm run build
cp -R ${PROJECT_DIR}/dist ${PACKAGING_CONFIG}/files
