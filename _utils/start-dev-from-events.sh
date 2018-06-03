#!/bin/bash

set -e


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export NODE_ENV=dev

if [ ! -f "${DIR}/../mrs-events.json" ]; then
  echo "Expected to have events list at ${DIR}/../mrs-events.json"
fi

DOCKER_NETWORK="$(docker network ls | grep monitoring-network || true)"
if [ "${DOCKER_NETWORK}" == "" ]; then
  docker network create -d overlay monitoring-network
fi

DOCKER_NETWORK="$(docker network ls | grep webproxy-network || true)"
if [ "${DOCKER_NETWORK}" == "" ]; then
  docker network create -d overlay webproxy-network
fi

cd ${DIR}/../mrs-events-db
docker stack rm mrs-events-db || true
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build dev
npm run packaging:image-push dev
npm run packaging:service-deploy dev
sleep 15
curl -X PUT http://127.0.0.1:5984/mrs-events
./docker-packaging-config/couchdb-backup.sh -r -H 127.0.0.1 -d mrs-events -f ${DIR}/../mrs-events.json


cd ${DIR}/../mrs-proxy
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build dev
npm run packaging:image-push dev
npm run packaging:service-deploy dev

cd ../mrs-server
npm install
npm run dev:docker
