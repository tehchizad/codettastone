const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  routes = require('./routes/routes'),
  port = process.env.PORT || 3000

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', routes)

app.listen(port, () => console.log("Server started on port " + port))