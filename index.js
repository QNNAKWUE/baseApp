const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('ci with travis');
});

const server = app.listen(7220, () => {
  console.log('App running on port 7220');
});

module.exports = server;