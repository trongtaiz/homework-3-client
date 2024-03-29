FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_SERVER_URL=

EXPOSE 3000

CMD ["npm", "start"]