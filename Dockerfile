FROM node:16.18.1

COPY ["package.json","package-lock.json","/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["npx","nodemon","index.js"]