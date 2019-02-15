const textbox = document.getElementById("output"),
  topbox = document.getElementById("header"),
  mapsKey = "AIzaSyBCFO3Lg7DaNsVjeBpK3CBalUEH3RfEANE"

let output = "",
  header = "",
  walkTime,
  message = "",
  directionsService,
  directionsDisplay

function initMap() {
  styleObj = fetch("json/mapstyle.json")
    .then(response => response.json())
    .then(styleObj => {
      let map = new google.maps.Map(document.getElementById("map"), options),
        styledMapType = new google.maps.StyledMapType(styleObj, { name: "Styled Map" })

      directionsService = new google.maps.DirectionsService()
      directionsDisplay = new google.maps.DirectionsRenderer()

      map.mapTypes.set("styled_map", styledMapType)
      map.setMapTypeId("styled_map")
      map.setCenter(gMarker)
      directionsDisplay.setMap(map)
      initMarkers(map)
    })
}

function getAPI() {
  let bartKey = "MW9S-E7SL-26DU-VV8V",
    abbr = "embr",
    bartURI = `https://api.bart.gov/api/etd.aspx?key=${bartKey}&cmd=etd&orig=${abbr}&json=y`

  fetch(bartURI)
    .then(response => response.json())
    .then(data => {
      message = data.root.station[0]
      populateOutput()
    })
    .catch(error => console.log(error))
}

function populateOutput() {
  header += `<h3 class="cover-heading">${message.name} station</h3>`
  message.etd.forEach(city => {
    calcRoute(directionsService, directionsDisplay, city)
  })
  topbox.innerHTML = header
}

function calcRoute(directionsService, directionsDisplay, city) {
  var start = gMarker
  var end = embarcaderoMarker
  var request = {
    origin: start,
    destination: end,
    travelMode: "WALKING"
  }
  directionsService.route(request, (result, status) => {
    if (status == "OK") {
      walkTime = result.routes[0].legs[0].duration.value / 60
      directionsDisplay.setDirections(result)
      parseArrivalTimes(city)
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
      output += `${etd} minutes</li><li class="list-inline-item">leave by ${adjustedDeptarture.toLocaleTimeString()}</li></ul>`
      console.log("depart",time.delay)
    } else if (etd == "Leaving") {
      output += `${etd}</li></ul>`
    } else {
      output += `${etd} minutes</li></ul>`
    }
  })
  textbox.innerHTML = output
}

getAPI()
