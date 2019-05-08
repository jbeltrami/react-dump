import React from 'react';
import PropTypes from 'prop-types';

const LocationFilter = props => {
  const { locations, onFilterLocation } = props;

  return (
    <div>
      <h1>Location Filter</h1>
      <ul>
        <li key="All">
          <button type="button" onClick={() => onFilterLocation('All')}>
            All
          </button>
        </li>
        {locations.map(e => (
          <li key={e}>
            <button type="button" onClick={() => onFilterLocation(e)}>
              {e}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

LocationFilter.propTypes = {
  locations: PropTypes.array,
  onFilterLocation: PropTypes.func,
};

export default LocationFilter;
