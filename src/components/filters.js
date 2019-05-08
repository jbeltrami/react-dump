import React from 'react';
import PropTypes from 'prop-types';

const Filters = props => {
  const { filterParams, onFilterLocation, filterType, filters } = props;

  return (
    <div>
      <h1>{filterType} Filter</h1>
      <ul>
        {filterParams.map(e => (
          <li key={e}>
            <button
              type="button"
              onClick={() => onFilterLocation(e, filterType)}
            >
              {e}
            </button>
          </li>
        ))}
      </ul>

      {filters[filterType].length ? (
        <button
          type="button"
          onClick={() => onFilterLocation('All', filterType)}
          style={{
            backgroundColor: 'yellow',
          }}
        >
          {filters[filterType]} X
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

Filters.propTypes = {
  filterParams: PropTypes.array,
  onFilterLocation: PropTypes.func,
  filterType: PropTypes.string,
  filters: PropTypes.object,
};

export default Filters;
