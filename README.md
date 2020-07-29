# Project Description
---

This repository holds the components to set up a barebones real-time chat system. It has a _very_ barebones React based frontend, an Express-and-Sockets.IO-based backend system and a simple chat support bot.

The following instructions have been tested using a bash based terminal and these deployment instructions **have not been tested on a Windows machine** as none was available during development.

## Required Supporting Services
---

In order to run the system, users must have Docker installed in their machine, as the setup and installation requires the Docker system. 

If you don't have docker installed please follow the instructions found here[https://docs.docker.com/get-docker/]


## Set Up

To ensure every system has the right environment variables in order to run, from this directory perform the following command.

```bash
    npm run setup
    npm run docker-network
```

Doing this will create an .env file for each subsystem. These .env files will be generated under the assumption that all necessary resources are hosted by the localhost. If this is not the case, please make sure to edit the entries in these .env files with the values that point  the system to the necessary resources.

For example, if you need to change the URL of the backend service, make sure to edit the .env file in the frontend to so that it resolves correctly.

## Deployment

Once your enviroment is set up correctly, run the following command from this repositories' directory

```bash
    npm run dockerize
```

This will build the necessary Docker images for each of the subsystems. After that, run the following command

```bash
    npm run get-services
```

Finally, to get an instance of the system running, run the following command

```bash
    npm run deploy
```

## Getting Started

After the deployment is done, use your browser to navigate to http://localhost:8080, where you should be greeted by a login screen for the chat system.

Register a user and you'll be sent to the chat room interface. From there, click create a chat room to get started.

Other users can join the same chat room, assuming they're navigating from a different browser, as part of the user information is stored in the browser cookies and local storage.

## Chat Features

Users can chat with each other via the chat window. Typing in /stock=< stock_code >  will trigger the automated bot to call an external API and will deliver the users in that chat room a pre-programmed message. If something goes wrong with the bot request, the bot will instead communicate a message as to why it couldn't obtain the required information.

Users in one chat room will not receive messages from other chat rooms and if messages are sent to other chat rooms, no notifications will appear on the user's screen. However, upon changing rooms, the user will load the last 50 messages that have been exchanged in the other room. 

## Security

Upon logging in to the system, the user is given a JWT token with a duration of 30 days. In order to send messages to users in the system, the backend checks that said JWT token has been sent from the frontend and that it remains valid.