#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

DOCKER_NETWORK="$(docker network ls | grep monitoring-network || true)"
if [ "${DOCKER_NETWORK}" == "" ]; then
  docker network create -d overlay monitoring-network
fi

DOCKER_NETWORK="$(docker network ls | grep webproxy-network || true)"
if [ "${DOCKER_NETWORK}" == "" ]; then
  docker network create -d overlay webproxy-network
fi

cd ${DIR}/../mrs-events-db
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build prod
npm run packaging:image-push prod
npm run packaging:service-deploy prod

cd ${DIR}/../mrs-proxy
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build prod
npm run packaging:image-push prod
npm run packaging:service-deploy prod

cd ${DIR}/../mrs-server
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build prod
npm run packaging:image-push prod
npm run packaging:service-deploy prod

cd ${DIR}/../mrs-web
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build prod
npm run packaging:image-push prod
npm run packaging:service-deploy prod
