const express = require('express')
const app = express()
// mongoose = require("mongoose"),
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const items = require('./routes/api/items')
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const env = require("node-env-file")
// env("./config/envVars")

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Mongo DB connected."))
//   .catch(err => console.log(err))

app.use('/', routes)
app.use('/api/items', items)

app.listen(port, () => console.log('Server started on port ' + port))
