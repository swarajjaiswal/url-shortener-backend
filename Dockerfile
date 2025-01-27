FROM node

WORKDIR /app

COPY . .

EXPOSE 4000

RUN npm install

CMD ["node", "index.js"]

