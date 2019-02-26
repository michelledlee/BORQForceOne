import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class EventRSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time
    };
  }

  onClick = e => {
    e.preventDefault();

    const rsvpMe = {
      name: this.state.name,
      email: this.state.email,
    };

    axios.post('/rsvp', rsvpMe)
      .then(res => console.log(res)) // re-direct to login on successful register
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="Comment col-4">
      <p>
      <span><strong>Name:</strong> {this.props.event.name}</span><br />
      <span><strong>Date:</strong> {this.props.event.date}</span><br />
      <span><strong>Time:</strong> {this.props.event.time}</span>
      </p>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        type="submit"
        className="btn btn-lg btn-primary btn-block text-uppercase"
        onClick={this.onClick}>
        RSVP
      </button>
      </div>
      );
  }
}

EventRSVP.propTypes = {
  EventRSVP: PropTypes.object.isRequired
};