import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      value,
    };
  }

  getBadgeClasses() {
    const { value } = this.state;
    let classes = 'badge m-2 badge-';
    classes += value === 0 ? 'warning' : 'primary';
    return classes;
  }

  handleIncrement = () => {
    const { value } = this.state;
    this.setState({ value: value + 1 });
  };

  formatCount() {
    const { value } = this.state;
    return value === 0 ? 'Zero' : value;
  }

  render() {
    const { onDelete, id } = this.props;
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
          type="button"
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          type="button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number,
  onDelete: PropTypes.func,
  id: PropTypes.number,
};

export default Counter;
