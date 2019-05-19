const gMarker = { lat: 37.78954, lng: -122.389988 }
const options = {
  zoom: 14,
  disableDefaultUI: true,
  center: gMarker
}
// const missionMarker = { lat: 37.7844, lng: -122.395 }
const bartImg = 'https://maps.gstatic.com/mapfiles/transit/iw2/6/us-ca-bart.png'
const markers = [
  {
    position: { lat: 37.7929, lng: -122.3971 },
    title: 'Embarcadero Bart',
    icon: bartImg
  },
  {
    position: { lat: 37.7845174, lng: -122.3950765 },
    title: 'Montgomery Bart',
    icon: bartImg
  }
]

function initMarkers (map) {
  markers.forEach(mark => {
    mark.map = map
    let marker = new window.google.maps.Marker(mark) // eslint-disable-line
  })
};

function initMap () { // eslint-disable-line
  fetch('json/mapstyle.json')
    .then(response => response.json())
    .then(styleObj => {
      let map = new window.google.maps.Map(document.getElementById('map'), options) // eslint-disable-line
      let styledMapType = new window.google.maps.StyledMapType(styleObj, { name: 'Styled Map' }) // eslint-disable-line

      directionsService = new window.google.maps.DirectionsService() // eslint-disable-line
      directionsDisplay = new window.google.maps.DirectionsRenderer() // eslint-disable-line

      map.mapTypes.set('styled_map', styledMapType)
      map.setMapTypeId('styled_map')
      map.setCenter(gMarker)
      directionsDisplay.setMap(map)// eslint-disable-line
      initMarkers(map)
    })
    .then(() => getAPI())// eslint-disable-line
}
