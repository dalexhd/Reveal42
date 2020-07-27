FROM node:12-alpine

WORKDIR /usr/src/presentation

COPY . .

RUN npm install

EXPOSE 1947
CMD ["npm", "start"]