FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
