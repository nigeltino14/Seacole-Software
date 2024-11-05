FROM node:18.0.0-alpine 
WORKDIR /app/

COPY package*.json ./

RUN npm install --save --legacy-peer-deps
COPY .  .


CMD ["npm", "run", "start"]