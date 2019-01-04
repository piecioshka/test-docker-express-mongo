FROM node:11.6.0-alpine

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
