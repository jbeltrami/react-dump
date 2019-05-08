import React from 'react';
import PropTypes from 'prop-types';

const DivisionFilter = props => {
  const { divisions, onFilterDivision } = props;

  return (
    <div>
      <h1>Division Filter</h1>
      <ul>
        <li key="All">
          <button type="button" onClick={() => onFilterDivision('All')}>
            All
          </button>
        </li>
        {divisions.map(e => (
          <li key={e}>
            <button type="button" onClick={() => onFilterDivision(e)}>
              {e}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
DivisionFilter.propTypes = {
  divisions: PropTypes.array,
  onFilterDivision: PropTypes.func,
};

export default DivisionFilter;
