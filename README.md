# Project Description
---

This repository holds the components to set up a barebones real-time chat system. It has a _very_ barebones React based frontend, an Express-and-Sockets.IO-based backend system and a simple chat support bot.

## Required Supporting Services
---

In order to run the system, the user must have Docker installed in their machine, as the setup and installation requires the Docker system. 

If you don't have docker installed please follow the instructions found here[https://docs.docker.com/get-docker/]


## Set Up

To ensure every system has the right environment variables in order to run, from this directory perform the following command.

```bash
    npm run setup
    npm run docker-network
```

Doing this will create an .env file for each subsystem. These .env files will be generated under the assumption that all necessary resources are hosted by the localhost. If this is not the case, please make sure to edit the entries in these .env files with the values that point the system to the necessary resources.

For example, if you need to change the port number of the backend service, make sure to edit its .env file but also the corresponding entry in the frontend .env file.

## Deployment

Once your enviroment is set up correctly, run the following command from this repositories directory

```bash
    npm run dockerize
```

This will build the necessary Docker images for each of the subsystems. After that, run the following command

```bash
    npm run get-service
```

