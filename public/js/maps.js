const gMarker = { lat: 37.78954, lng: -122.389988 },
  options = {
    zoom: 14,
    disableDefaultUI: true,
    center: gMarker
  },
  missionMarker = { lat: 37.7844, lng: -122.395 },
  bartImg = "https://maps.gstatic.com/mapfiles/transit/iw2/6/us-ca-bart.png",
  markers = [
    {
      position: { lat: 37.7929, lng: -122.3971 },
      title: "Embarcadero Bart",
      icon: bartImg
    },
    {
      position: {lat: 37.7845174, lng: -122.3950765},
      title: "Montgomery Bart",
      icon: bartImg
    }
  ]

function initMarkers(map) {
  markers.forEach(mark => {
    mark.map = map
    let marker = new google.maps.Marker(mark)
  })
}

function initMap() {
  fetch("json/mapstyle.json")
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
    .then(() => getAPI())
}