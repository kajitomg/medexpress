FROM node:22-alpine AS base

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 1337
CMD ["npm", "run", "develop"]