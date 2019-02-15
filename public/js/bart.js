const textbox = document.getElementById("output"),
  topbox = document.getElementById("header"),
  mapsKey = "AIzaSyBCFO3Lg7DaNsVjeBpK3CBalUEH3RfEANE"

let walkTime, directionsService, directionsDisplay

function getAPI() {
  let bartKey = "MW9S-E7SL-26DU-VV8V",
    abbr = "embr"

  calcRoute()
  fetch(`https://api.bart.gov/api/etd.aspx?key=${bartKey}&cmd=etd&orig=${abbr}&json=y`)
    .then(response => response.json())
    .then(data => populateOutput(data.root.station[0]))
    .catch(error => console.log(error))
}

function populateOutput(message) {
  let header = `<h4 class="cover-heading">${message.name} station</h4>`
  message.etd.forEach(city => {
    parseArrivalTimes(city)
  })
  topbox.innerHTML = header
}

function calcRoute() {
  let request = {
    origin: gMarker,
    destination: markers[0].position,
    travelMode: "WALKING"
  }
  directionsService.route(request, (result, status) => {
    if (status == "OK") {
      walkTime = result.routes[0].legs[0].duration.value / 60
      directionsDisplay.setDirections(result)
    } else {
      console.log("Error", status)
    }
  })
}

function parseArrivalTimes(city) {
  output += `<ul class="list-inline"><li class="list-inline-item border rounded-pill" style="padding:2px 10px;border-color:
  ${city.estimate[0].hexcolor}!important">
  ${city.destination} ${city.estimate[0].direction} bound</li>`
  city.estimate.forEach(time => {
    output += `<ul class="list-inline"><li class="list-inline-item">`
    let etd = time.minutes
    if (etd != "Leaving" && etd >= walkTime) {
      let now = new Date(),
        departure = new Date(now.getTime() + etd * 60000 + time.delay * 60),
        adjustedDeptarture = new Date(departure - walkTime * 60000)
      output += `${etd} minutes: leave by ${adjustedDeptarture.toLocaleTimeString()}</li></ul>`
    } else if (etd == "Leaving") {
      output += `${etd}</li></ul>`
    } else {
      output += `${etd} minutes</li></ul>`
    }
  })
  textbox.innerHTML = output
}
