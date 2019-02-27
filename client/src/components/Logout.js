import React, { Component } from "react";
import axios from "axios";
// import setAuthToken from "../actions/setAuthToken";
// import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { LogoutUser } from "../actions/authActions";
// import classnames from "classnames";

export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_ERRORS = "GET_ERRORS";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Logout page, should redirect them to landing
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/landing");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/landing"); // push user to landing when they Logout
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    localStorage.removeItem("email");

    axios
      .post("/logout")
      .then(res => {
        this.props.history.push("/landing"); // re-direct to landing on successful register
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Logout
      </button>
    );
  }
}
Logout.propTypes = {
  // LogoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps
  // { LogoutUser }
)(withRouter(Logout));