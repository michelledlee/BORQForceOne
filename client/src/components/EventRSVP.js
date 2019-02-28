import Attendee from "./Attendee.js";
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EventRSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time,
      attendees: this.props.event.rsvp
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  renderAttendees() {
    return this.state.attendees.map((a, i) => <Attendee key={i++} attendee={a} />);
  }

  onClick(e) {
    const rsvpMe = {
      name: this.state.name,
      email: this.state.email,
    };

    axios.post('/rsvp', rsvpMe)
      .then(res => this.props.history.push("/myevents")) // re-direct to my events page on successful RSVP
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="Comment col-4">
      <p>
      <span><strong>Name:</strong> {this.props.event.name}</span><br />
      <span><strong>Date:</strong> {this.props.event.date}</span><br />
      <span><strong>Time:</strong> {this.props.event.time}</span><br />
      <span className="spandescription"><strong>Description: </strong> {this.props.event.description}</span>
      </p>
            <span><strong>Attendees:</strong> {this.props.event.attendees}</span>
             <nav>
            <ol>
                {this.renderAttendees()}
            </ol>
        </nav>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        type="submit"
        className="btn btn-lg btn-primary btn-block text-uppercase"
        onClick={this.onClick.bind(this)}>
        RSVP
      </button>
      <br />
      </div>
      );
  }
}

EventRSVP.propTypes = {
  EventRSVP: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(withRouter(EventRSVP));