# build environment
FROM node:10 as build

# Create a home directory and navigate to it
ENV HOME=/usr/src/app
WORKDIR $HOME

COPY . .
RUN npm install
RUN npm run build

# Prepare the build environment and save it
FROM nginx:stable-alpine
LABEL maintainer="Eduardo Escudero"
LABEL description="Frontend Service - Frontend Service for a simple chat room application"
LABEL version="v1.0.0"
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]