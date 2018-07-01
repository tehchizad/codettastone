const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  items = require('./routes/api/items')

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected."))
  .catch(err => console.log(err))

app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server started on port " + port))