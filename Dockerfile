FROM node:12

WORKDIR /usr/src/presentation

COPY . .

RUN npm install --unsafe-perm

EXPOSE 1947
CMD ["npm", "start"]