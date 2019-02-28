// EventsMap.js

import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DogMarker from "./DogMarker";

const EventsMap = withScriptjs(withGoogleMap((props) =>{
  const markers = props.events.map(events => {
    let latitude = parseFloat(events.lat)
    let longitude = parseFloat(events.long)
    let marker = <DogMarker
                    key={events.name}
                    name={events.name}
                    location={{lat: latitude, lng: longitude}}
                  />
    return marker
  })
  return (
      <GoogleMap
        defaultZoom={10}
        center={{ lat: 37.257299, lng: -121.786334 }}
        >
        {markers}
      </GoogleMap>
    )
  }
))

export default EventsMap