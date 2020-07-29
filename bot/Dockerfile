FROM node:10

LABEL maintainer="Eduardo Escudero"
LABEL description="Bot Service - Support Bot Service for a simple chat room application"
LABEL version="v1.0.0"


# Create a home directory and navigate to it
ENV HOME=/usr/src/app
WORKDIR $HOME

#Copy the files in the directory and install the package dependencies
COPY . .
RUN npm install

#Make sure other applications can reach the exposed port
EXPOSE 4000

# Start the application
CMD [ "npm", "start" ]
