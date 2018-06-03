# Monitoring Really Simple (MRS)

Monitoring Really Simple (MRS) is a monitoring module designed to be lightweight and easy to deploy.

There are a lot of very good monitoring tools out there but there are usually too heavy to be worth deploying for small servers. (For example for blog, personal dev servers, ...). The idea here is to have a solution which at its core would use less than 100MB of memory. Then all the small single-node servers can have at least some basic monitoring tools.

# How to deploy

You will need Docker to deploy this Project. Currently tested with Docker Swarm.

The deployment procedure is illustrated in the \_utils/start-prod.sh script. It involves getting in each folder and executing the following command:

```
npm run packaging:init
npm run packaging:prepare
npm run packaging:image-build prod
npm run packaging:image-push prod
npm run packaging:service-deploy prod
```

The default docker-compose file is docker-packaging-config/docker-compose.yml folder but you can customize it by creating a docker-packaging-config/docker-compose-prod.yml file.

_Note: after cloning the repo, don't forget to initialize the submodules:
`git submodule update --init --recursive`_

# Optional dependencies

This project has a few optional dependencies

* https://github.com/DidierHoarau/docker-packaging: This is a wrapper around docker-compose. This dependency is imported by this repository's submodules. You can choose to ignore it and package it your way.
* https://github.com/DidierHoarau/docker-webproxy: There are references to this project in the docker-compose files. It is used to have 1 simple web proxy in front of all your project. You can choose also to ignore it and expose some of the services directly.
* https://github.com/DidierHoarau/docker-data-backup: There are references to this project in the docker-compose files. It is used to backup the database. (it can also be used in conjunction with https://github.com/DidierHoarau/docker-dropbox-uploader for example). You can choose to ignore it and use your own backup mechanism.

MRS will work just fine without the last 2 repositories.

# Extensibility

The main goal is to keep the core services of the project to be light and fast to deploy. Extensibility will however be taken into account and should be implemented in optional services that users would choose to deploy or not depending of their needs.
