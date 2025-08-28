FROM node:22-alpine AS base

WORKDIR /opt/application

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
#CMD ["sleep", "infinity"]