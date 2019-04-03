import React, { useEffect } from 'react'

export default function Map () {
  useEffect(() => {
    loadScript()
  })

  function initMarkers (map) {
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
    markers.forEach(mark => {
      console.log('yep')
      mark.map = map
      // eslint-disable-next-line
      const marker = new window.google.maps.Marker(mark)
    })
  }
  // eslint-disable-next-line
  function initMap() {
    const gMarker = { lat: 37.78954, lng: -122.389988 }
    const options = {
      zoom: 14,
      disableDefaultUI: true,
      center: gMarker
    }
    const map = new window.google.maps.Map(document.getElementById('map'), options)
    initMarkers(map)
  }

  return (
    <React.Fragment>
      <div id='map'></div>
    </React.Fragment>
  )
}

function loadScript () {
  let apiKey = 'AIzaSyBCFO3Lg7DaNsVjeBpK3CBalUEH3RfEANE'
  let url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`

  let index = window.document.getElementsByTagName('script')[ 0 ]
  let script = window.document.createElement('script')

  script.src = url
  script.async = true
  script.defer = true

  index.parentNode.insertBefore(script, index)
}
