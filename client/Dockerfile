# Setup and build the client
# FROM node:9.4.0-alpine as client
# WORKDIR /usr/app/client/
# COPY client/package*.json ./
# RUN npm install -qy
# COPY client/ ./
# RUN npm run build


FROM node:11-alpine
WORKDIR /client
COPY package.json ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]