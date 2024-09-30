# pull official base image
FROM node:18.17.1-alpine

WORKDIR /app/

COPY package*.json ./

RUN npm install --force or --legacy-peer-deps

# add app
COPY . ./

# start app
CMD ["npm", "start"]
