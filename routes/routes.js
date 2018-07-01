const express = require('express'),
  app = express();

app.get('/', function (req, res) {
  res.render('index', {})
})

app.use('/oauth', function (req, res) {
  res.render('oauth', {})
})

module.exports = app