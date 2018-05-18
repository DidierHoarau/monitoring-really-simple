#!/bin/bash

rm -fr /opt/backups/
mkdir -p /opt/backups/

/opt/scripts/couchdb-backup.sh -b -H 127.0.0.1 -d mrs -f /opt/backups/mrs.json
