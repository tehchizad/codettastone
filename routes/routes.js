const express = require("express"),
  app = express()

app.get("/", (req, res) => {
  res.render("index", {})
})

app.use("/youtube", (req, res) => {
  res.render("youtubeAPI", {})
})

app.use("/rest", (req, res) => {
  res.render("post-utility", {})
})

app.use("/demo", (req, res) => {
  res.render("demo", {})
})

module.exports = app
