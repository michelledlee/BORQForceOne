import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time
    };
  }

  render() {
    return (
      <div className="Comment col-4">
      <p>
      <span><strong>Name: </strong> {this.props.event.name}</span><br />
      <span><strong>Date: </strong> {this.props.event.date}</span><br />
      <span><strong>Time: </strong> {this.props.event.time}</span>
      </p>
      </div>
      );
  }
}

Event.propTypes = {
  Event: PropTypes.object.isRequired
};