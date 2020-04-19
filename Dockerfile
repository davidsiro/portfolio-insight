FROM node:12.16.1

WORKDIR /usr/portfolio-insight
COPY package*.json ./
RUN npm install
COPY database.json ./
COPY migrations/ ./migrations

COPY csv_import.sh .
COPY src/ ./src

CMD ["node", "src/app.js"]
