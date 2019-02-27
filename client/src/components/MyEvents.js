import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
import Event from "./Event.js";
import Logout from "./Logout.js";

class MyEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    fetch("/getmyevents")
    .then(res => res.json())
    .then(data => {
      console.log("got events!", data);
      this.setState({
        events: data
      });
    });
  }

  renderEvents() {
    return this.state.events.map((eve, i) => <Event key={i++} event={eve} />);
  }

  // onLogoutClick = e => {
  //   e.preventDefault();
  //   this.props.logoutUser();
  // };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align" style={{padding:"100px"}}>
      <h4>
      <b>Hey there, {localStorage.getItem("email")}</b> !
      </h4>
      <p>You have {this.state.events.length === 0 ? 0 : this.state.events.length} events upcoming.
      </p>

      <div className="row">{this.renderEvents()}</div>

      <p> <Link to="/registerevent">Add Event</Link></p>

      <Link to="/mydogs" className="btn btn-lg btn-primary btn-block text-uppercase">My Dogs</Link>
      <Link to="/dashboard" className="btn btn-lg btn-primary btn-block text-uppercase">My Home</Link>
      <Link to="/browseevents" className="btn btn-lg btn-primary btn-block text-uppercase">Browse Events</Link>


      <Logout />
      </div>
      </div>
      </div>
      );
  }
}
MyEvents.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  // { logoutUser }
  )(MyEvents);