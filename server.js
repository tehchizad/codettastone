const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  items = require('./routes/api/items'),

  app = express()

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected."))
  .catch(err => console.log(err))

  app.use('/oauth', oauth)
  app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server started on port " + port))