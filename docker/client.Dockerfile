FROM node:22-alpine AS base

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
#CMD ["npm", "run", "dev"]
CMD ["sleep", "infinity"]