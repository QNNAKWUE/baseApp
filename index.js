const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('ci with travis');
});

const server = app.listen(7000, () => {
  console.log('App running on port 7000');
});

module.exports = server;