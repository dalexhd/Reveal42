FROM node:12

WORKDIR /usr/src/presentation

COPY . .

RUN npm install

CMD ["npm", "run", "serve"]