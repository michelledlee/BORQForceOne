import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
import Dog from "./Dog.js";
import Logout from "./Logout.js";


class MyDogs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs() {
    fetch("/getmydogs")
    .then(res => res.json())
    .then(data => {
      console.log("got dogs!", data);
      this.setState({
        dogs: data
      });
    });
  }


  renderDogs() {
    return this.state.dogs.map((d, i) => <Dog key={i++} dog={d} />);
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
      <p>You have {this.state.dogs.length === 0 ? 0 : this.state.dogs.length} dogs.
      </p>

      <div className="row">{this.renderDogs()}</div>
      <p> <Link to="/registerdog">Add Dog</Link></p>
      
      <Link to="/dashboard" className="btn btn-lg btn-primary btn-block text-uppercase">My Home</Link>
      <Link to="/myevents" className="btn btn-lg btn-primary btn-block text-uppercase">My Events</Link>
      <Link to="/browseevents" className="btn btn-lg btn-primary btn-block text-uppercase">Browse Events</Link>



      <Logout />
      </div>
      </div>
      </div>
      );
  }
}
MyDogs.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  // { logoutUser }
  )(MyDogs);