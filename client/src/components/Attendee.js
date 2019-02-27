import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Attendee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendee: this.props.attendee
    };
  }

  render() {
    return (
      <li><span>{this.props.attendee.split("@")[0]}</span></li>
      );
  }
}

Attendee.propTypes = {
  Attendee: PropTypes.object.isRequired
};