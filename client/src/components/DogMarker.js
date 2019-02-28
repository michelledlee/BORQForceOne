import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import DogIcon from "./Dog_Emoji_Marker.png";

export default class DogMarker extends React.Component {

  render(){
    return(
      <div>
        <Marker 
          position={ this.props.location }
          icon={DogIcon}
        >
        </Marker>
      </div>
    )

  }
}