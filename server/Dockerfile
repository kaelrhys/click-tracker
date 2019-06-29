# FROM node:9.4.0-alpine
# WORKDIR /usr/app/
# COPY --from=client /usr/app/client/build/ ./client/build/
# WORKDIR /usr/app/server/
# COPY server/package*.json ./
# RUN npm install -qy
# COPY server/ ./
# ENV PORT 8000
# EXPOSE 8000

# CMD ["npm", "start"]


FROM node:11-alpine

WORKDIR /server
# ENV TOKEN_SECRET=supersecret
# ENV DB_USER=root
# ENV DB_NAME=mvw
# ENV DB_HOST=mvw_db
# ENV DB_PASSWORD=P@ssw0rd

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 8080

CMD [ "node", "server.js" ]