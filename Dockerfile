FROM node:latest AS builder
WORKDIR /app
COPY ./package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "run", "start:prod"]