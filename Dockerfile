FROM node:8

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app

CMD npm run start

EXPOSE 3000