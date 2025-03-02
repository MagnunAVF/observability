FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY .env .env
RUN npm install

COPY ./src/. .

EXPOSE 3000

CMD ["node", "index.js"]