FROM node:13

WORKDIR /usr/src/Reveal42

COPY . .

RUN npm install

CMD ["npm", "start"]
