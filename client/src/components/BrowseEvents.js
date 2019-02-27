import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
import EventRSVP from "./EventRSVP.js";
import Logout from "./Logout.js";


class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getAllEvents() {
    fetch("/getallevents")
      .then(res => res.json())
      .then(data => {
        console.log("got all events!", data);
        this.setState({
          events: data
        });
      });
  }

  componentDidMount() {
    this.getAllEvents();
  }

  renderEvents() {
    return this.state.events.map((eve, i) => <EventRSVP key={i++} event={eve} />);
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" style={{ padding: "100px" }}>
            <h4>
              <b>Hey there, {localStorage.getItem("email")}</b> !
            </h4>
            <p>Look at all these events:</p>

            <div className="row">{this.renderEvents()}</div>

            <Link
              to="/mydogs"
              className="btn btn-lg btn-primary btn-block text-uppercase">
              My Dogs
            </Link>
            <Link
              to="/myevents"
              className="btn btn-lg btn-primary btn-block text-uppercase">
              My Events
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-lg btn-primary btn-block text-uppercase">My Home
            </Link>
            <Logout />
          </div>
        </div>
      </div>
    );
  }
}
BrowseEvents.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
  // { logoutUser }
)(BrowseEvents);