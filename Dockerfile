FROM node:11-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .

EXPOSE 2268
CMD [ "npm", "start" ]
