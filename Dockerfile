FROM node:15-alpine

WORKDIR /usr/src/presentation

COPY . .

RUN npm install

CMD ["npm", "run", "serve"]