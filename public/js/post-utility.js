const responseInput = document.getElementById("output"),
  urlInput = document.getElementById("uri")

function getAPI() {
  let URI = urlInput.value
  fetch(URI)
    .then(response => response.json())
    .then(data => {
      let output = "<h2>results:</h2>"
      data.forEach(user => {
        console.log(JSON.parse(user))
      })
      responseInput.innerHTML = output
    })
    .catch(error => console.log(error))
}
