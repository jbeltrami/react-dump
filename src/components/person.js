import React from 'react';
import PropTypes from 'prop-types';

export default function Person(props) {
  const { name, dob, email, gender } = props;
  return (
    <div className="col-lg-4 my-4">
      <p className="mb-0">
        Name: {name.first} {name.last}
      </p>
      <p className="mb-0">Age: {dob.age}</p>
      <p className="mb-0">Gender: {gender}</p>
      <p>email: {email}</p>
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.object,
  gender: PropTypes.string,
  dob: PropTypes.object,
  email: PropTypes.string,
};
