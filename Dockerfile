FROM node:20-alpine3.18 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine3.18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

ENV MONGO_DB_HOST=localhost \
    MONGO_DB_PORT=27017 \
    MONGO_DB_DATABASE=clients-data-general \
    REDIS_HOST=localhost \
    PORT=3001

EXPOSE 3001

CMD ["node", "dist/main"]