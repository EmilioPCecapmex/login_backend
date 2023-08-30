# Layer 1
FROM node:16.18.1-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# layer1

COPY . .                                      

CMD [ "npm", "run", "start:prod" ]