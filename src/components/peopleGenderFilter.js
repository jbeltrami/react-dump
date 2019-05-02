import React from 'react';
import PropTypes from 'prop-types';

export default function PeopleGenderFilter(props) {
  const { genders, onFilter } = props;

  return (
    <div className="row">
      {genders.map((e, i) => (
        <div className="col-lg-4" key={i}>
          <button
            className="w-100 btn btn-warning my-2"
            type="button"
            onClick={() => onFilter(e)}
          >
            {e}
          </button>
        </div>
      ))}
    </div>
  );
}

PeopleGenderFilter.propTypes = {
  genders: PropTypes.array,
  onFilter: PropTypes.func,
};
