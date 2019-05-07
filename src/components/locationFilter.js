import React from 'react';
import PropTypes from 'prop-types';

const LocationFilter = props => {
  const { locations, onFilterLocation } = props;

  return (
    <div>
      {/* <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>Action</li>
          <li className="dropdown-item">Another action</li>
          <li className="dropdown-item">Something else here</li>
        </div>
      </div> */}

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
