FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .

EXPOSE 2268
CMD [ "npm", "start" ]
