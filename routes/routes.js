const express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.render('index', {})
})

app.use('/youtube', (req, res) => {
  res.render('youtubeAPI', {})
})

module.exports = app