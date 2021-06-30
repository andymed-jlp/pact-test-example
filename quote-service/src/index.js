const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// "In memory" data store
let dataStore = require('./data/quotes.js');

server.get('/quote', (_, res) => {
  res.json(dataStore);
});

const startServer = () => {
  try {
    server.listen('8080');
    console.log(`Quote server now running on port 8080...`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  server,
  dataStore,
  startServer,
};
