import React from 'react';
import PropTypes from 'prop-types';

export default function PeopleAgeFilter(props) {
  const { ages, onFilter } = props;

  return (
    <div className="row">
      {ages.map((e, i) => (
        <div className="col-lg-4" key={i}>
          <button
            className="w-100 btn btn-warning my-2"
            type="button"
            onClick={() => onFilter(e)}
          >
            Filter age above {e} years old
          </button>
        </div>
      ))}
    </div>
  );
}

PeopleAgeFilter.propTypes = {
  ages: PropTypes.array,
  onFilter: PropTypes.func,
};
