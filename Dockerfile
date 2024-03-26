# Dockerfile for Waifuism API
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Your port here if different from 3000
EXPOSE 3000

CMD [ "node", "server.js" ]
