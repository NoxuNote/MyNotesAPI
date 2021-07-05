FROM node:11-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .

CMD [ "npm", "start" ]
