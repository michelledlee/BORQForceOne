import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../App.css';
import Logout from "./Logout.js";


class Dashboard extends Component {

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align" style={{padding:"100px"}}>
      <h4>
      <b>Hey there, {localStorage.getItem("email")}</b>!
      </h4>
      <p className="flow-text grey-text text-darken-1">
      Welcome to your BORQ homepage! Check out the dogs you have added, the events you have coming up, or browse new events to attend!
      </p>
      
      <Link to="/mydogs" className="btn btn-lg btn-primary btn-block text-uppercase">My Dogs</Link>
      <Link to="/myevents" className="btn btn-lg btn-primary btn-block text-uppercase">My Events</Link>
      <Link to="/browseevents" className="btn btn-lg btn-primary btn-block text-uppercase">Browse Events</Link>

      <Logout />
      </div>
      </div>
      </div>
      );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  )(Dashboard);
