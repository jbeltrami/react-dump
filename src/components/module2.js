import React from 'react';
import PropTypes from 'prop-types';

// This is a function component. Meaning it doesn't have a state.
// Function Components are supposed to be short, easy to maintain and can get data from props
function Module2(props) {
  const { url, name, ocupation } = props;
  return (
    <div className="col-lg-4 mb-4">
      <img className="d-block w-100" src={url} alt="" />
      <div>
        {name} / {ocupation}
      </div>
    </div>
  );
}

Module2.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  ocupation: PropTypes.string,
};

export default Module2;
