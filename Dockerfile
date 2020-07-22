FROM node:12-alpine

WORKDIR /usr/src/presentation

RUN npm install -g gulp

CMD ["gulp", "build"]