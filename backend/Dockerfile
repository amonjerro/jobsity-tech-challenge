FROM node:10

LABEL maintainer="Eduardo Escudero"
LABEL description="Backend Service - Backend Service for a simple chat room application"
LABEL version="v1.0.0"


# Create a home directory and navigate to it
ENV HOME=/usr/src/app
WORKDIR $HOME

#Copy the files in the directory and install the package dependencies
COPY . .
RUN npm install
RUN npm install bcrypt --save

#Make sure other applications can reach the exposed port
EXPOSE 4100

# Start the application
CMD [ "npm", "start" ]
