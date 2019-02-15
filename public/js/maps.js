const gMarker = { lat: 37.78954, lng: -122.389988 },
  options = {
    zoom: 14,
    disableDefaultUI: true,
    center: gMarker
  },
  embarcaderoMarker = { lat: 37.7929, lng: -122.3971 },
  missionMarker = { lat: 37.7844, lng: -122.395 },
  bartImg = "https://maps.gstatic.com/mapfiles/transit/iw2/6/us-ca-bart.png",
  markers = [
    {
      position: embarcaderoMarker,
      title: "Bart",
      icon: bartImg
    },
    {
      position: missionMarker,
      title: "Bart",
      icon: bartImg
    }
  ]


function initMarkers(map) {
  markers.forEach(mark => {
    mark.map = map
    let marker = new google.maps.Marker(mark)
  })
}
