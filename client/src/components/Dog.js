import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Dog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      age: this.props.age,
      breed: this.props.breed,
      gender: this.props.gender,
    };

  }

  render() {
    return (
      <div className="Comment col-4">
      <p>
      <span><strong>Name: </strong>{this.props.dog.name}</span><br />
      <span><strong>Age: </strong>{this.props.dog.age}</span><br />
      <span><strong>Breed: </strong>{this.props.dog.breed}</span><br />
      <span><strong>Gender: </strong>{this.props.dog.gender}</span>
      </p>
      </div>
      );
  }
}

Dog.propTypes = {
  dog: PropTypes.object
};




