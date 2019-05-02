import React from 'react';
import PropTypes from 'prop-types';

export default function Person(props) {
  const { name, dob, email } = props;
  return (
    <div className="col-lg-3 my-4">
      <p className="mb-0">
        Name: {name.first} {name.last}
      </p>
      <p className="mb-0">Age: {dob.age}</p>
      <p>email: {email}</p>

      {/* <p>Category: {Math.floor(Math.random() * 3) + 1}</p>
      <p>Job: {Math.floor(Math.random() * 3) + 1}</p>
      <p>Location: {Math.floor(Math.random() * 6) + 1}</p> */}
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.object,
  dob: PropTypes.object,
  email: PropTypes.string,
};
