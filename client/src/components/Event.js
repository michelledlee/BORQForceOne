import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time,
      description: this.props.event.description
    };
  }

  render() {
    return (
      <div className="Comment col-4">
      <br />
      <span><strong>Name: </strong> {this.props.event.name}</span><br />
      <span><strong>Date: </strong> {this.props.event.date}</span><br />
      <span><strong>Time: </strong> {this.props.event.time}</span><br />
      <span><strong>Description: </strong> {this.props.event.description}</span>
      <br />
      </div>
      );
  }
}

Event.propTypes = {
  Event: PropTypes.object
};