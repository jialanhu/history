FROM node:lts-alpine

WORKDIR /code

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["node", "app.js"]
