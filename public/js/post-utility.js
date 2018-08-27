const request = require("request"),
  uri =
    "https://login.salesforce.com/services/oauth2/token?client_id=3MVG9CVKiXR7Ri5paGHTO9OpJnGusiWYCpwJAMK9CuPQTaWe0ThP3LRCkUb0NRe923mdhwPKMvpc8nKTRi7EN&client_secret=7701092895239561192&grant_type=password&username=invitaeslack%40taos.ms&password=cdUHzkWp8VWv8nQn8vXSQEJB!",
  textArea = document.querySelector("#post-data")

// REQUEST POST //
request.post(uri, (error, response, body) => {
  if (error) return console.error("upload failed:", error)
  console.log("::  Request POST  :: ")
  console.log(`SF_AUTH_TOKEN=${JSON.parse(body).access_token}`)
  console.log(`SF_AUTH_TIME=${JSON.parse(body).issued_at}`)
  console.log(`SF_AUTH_SIG=${JSON.parse(body).signature}\n`)
  textArea.value = JSON.parse(body).access_token
})
