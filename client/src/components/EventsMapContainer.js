// EventsMapContainer.js

import React from "react";
import EventsMap from "./EventsMap";

export default class EventsMapContainer extends React.Component {

	render() {
		return (
				<EventsMap
					events={this.props.events}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBO37tWXY7797JXJmFXstlFy4J6rSMcu68&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `600px`, width: `600px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
		);
	}
}