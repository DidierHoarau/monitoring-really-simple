#!/bin/bash

set -e

npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build dev
npm run packaging:image-push dev
npm run packaging:service-deploy dev

sleep 15

CONTAINER=$(docker ps | grep mrs-server | head -n1 | cut -d" " -f1)
docker exec -ti ${CONTAINER} bash -c "cd /opt/app && npm run --silent dev"
