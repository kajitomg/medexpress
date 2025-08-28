FROM node:22-alpine AS base

WORKDIR /opt/application
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]