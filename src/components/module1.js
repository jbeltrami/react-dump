import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Module1 extends Component {
  constructor(props) {
    super(props);
    const { name, age, place } = this.props;
    this.state = {
      name,
      age,
      place,
    };
  }

  render() {
    const { name, age, place } = this.state;

    return (
      <p>
        Mr {name}, is {age} and lives in {place}
      </p>
    );
  }
}

Module1.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  place: PropTypes.string,
};

export default Module1;
