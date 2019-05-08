import React from 'react';
import PropTypes from 'prop-types';

const ServiceFilter = props => {
  const { services, onFilterService } = props;

  return (
    <div>
      <h1>Location Filter</h1>
      <ul>
        <li key="All">
          <button type="button" onClick={() => onFilterService('All')}>
            All
          </button>
        </li>
        {services.map(e => (
          <li key={e}>
            <button type="button" onClick={() => onFilterService(e)}>
              {e}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ServiceFilter.propTypes = {
  services: PropTypes.array,
  onFilterService: PropTypes.func,
};

export default ServiceFilter;
