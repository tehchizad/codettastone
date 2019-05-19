const textbox = document.getElementById('output')
const topbox = document.getElementById('header')
// const mapsKey = 'AIzaSyBCFO3Lg7DaNsVjeBpK3CBalUEH3RfEANE'

let walkTime = 12
let directionsService
let directionsDisplay

function getAPI () { // eslint-disable-line
  let bartKey = 'MW9S-E7SL-26DU-VV8V'
  let abbr = 'embr'

  calcRoute()
  fetch(
    `https://api.bart.gov/api/etd.aspx?key=${bartKey}&cmd=etd&orig=${abbr}&json=y`
  )
    .then(response => response.json())
    .then(data => populateOutput(data.root.station[ 0 ]))
    .catch(error => console.log(error))

  function populateOutput (message) {
    let headerData = `<h4 class="cover-heading">${message.name} station</h4>`
    console.log('item', message.etd)
    message.etd.forEach(city => {
      console.log('city', city)

      parseArrivalTimes(city)
    })
    topbox.innerHTML = headerData
  };;

  function calcRoute () {
    let request = {
      // origin: gMarker,
      // destination: markers[ 0 ].position,
      travelMode: 'WALKING'
    }
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        walkTime = result.routes[ 0 ].legs[ 0 ].duration.value / 60
        directionsDisplay.setDirections(result)
      } else {
        console.log('Error', status)
      }
    })
  }

  function parseArrivalTimes (city) {
    let outputData = '<ul class="list-inline">'
    outputData += `<li class="list-inline-item border rounded-pill" style="padding:2px 10pxborder-color:
  ${city.estimate[ 0 ].hexcolor}!important">
  ${city.destination} ${city.estimate[ 0 ].direction} bound</li>`
    city.estimate.forEach(time => {
      outputData += '<ul class="list-inline"><li class="list-inline-item">'
      let etd = time.minutes
      if (etd !== 'Leaving' && etd >= walkTime) {
        let now = new Date()
        let departure = new Date(now.getTime() + etd * 60000 + time.delay * 60)
        let adjustedDeptarture = new Date(departure - walkTime * 60000)
        outputData += `${etd} minutes: leave by ${adjustedDeptarture.toLocaleTimeString()}</li></ul>`
      } else if (etd === 'Leaving') {
        outputData += `${etd}</li></ul>`
      } else {
        outputData += `${etd} minutes</li></ul>`
      }
    })
    textbox.innerHTML += outputData
  }
}
