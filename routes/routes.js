const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('index', {})
})

app.use('/youtube', (req, res) => {
  res.render('youtubeAPI', {})
})

app.use('/rest', (req, res) => {
  res.render('post-utility', {})
})

app.use('/bart', (req, res) => {
  res.render('bart', {})
})

module.exports = app
