const textbox = document.getElementById("output"),
  topbox = document.getElementById("header"),
  bartKey = "MW9S-E7SL-26DU-VV8V",
  mapsKey = "AIzaSyBCFO3Lg7DaNsVjeBpK3CBalUEH3RfEANE",
  walkTime = 12,
  now = new Date(),
  abbr = "embr"

let output = ""
let header = ""

function getAPI() {
  let bartURI = `https://api.bart.gov/api/etd.aspx?key=${bartKey}&cmd=etd&orig=${abbr}&json=y`

  fetch(bartURI)
    .then(response => response.json())
    .then(data => {
      let message = data.root.station[0],
        departTimes = message.etd
      header += `<h1 class="h3 mb-3 font-weight-normal">bart departures: ${
        message.name
      } station</h1>`
      departTimes.forEach(city => {
        parseArrivalTimes(city)
      })
      textbox.innerHTML = output
      topbox.innerHTML = header
      console.log(now)
    })
    .catch(error => console.log(error))
}

function parseArrivalTimes(city) {
  console.log("city stuff", city.estimate[0])
  output += `
  <hr>
        <ul class="list-inline">
        <li class="list-inline-item">
        ${city.destination} ${city.estimate[0].direction} bound
        </li>
        <hr color="${city.estimate[0].hexcolor}">`
  city.estimate.forEach(time => {
    let etd = time.minutes
    if (etd == "Leaving") {
      output += `
      <ul class="list-inline">
        <li class="list-inline-item">
          ${etd}
        </li>    
      </ul>`
    } else if (etd != "Leaving" && etd >= walkTime) {
      let departure = new Date(now.getTime() + etd * 60000 + time.delay * 60000),
        adjustedDeptarture = new Date(departure - walkTime * 60000)
      output += `
      <ul class="list-inline">
        <li class="list-inline-item">
          ${etd} minutes
        </li>
        <li class="list-inline-item">
        leave by ${adjustedDeptarture.toLocaleTimeString()}
        </li>        
      </ul>`
    } else {
      output += `
      <ul class="list-inline">
        <li class="list-inline-item">
          ${etd} minutes
        </li>    
      </ul>`
    }
  })
}

getAPI()
