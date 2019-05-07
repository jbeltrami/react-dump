import React from 'react';
import PropTypes from 'prop-types';

const peoplePagination = props => {
  const { people, pplPerPage, onPaginate } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(people.length / pplPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-center justify-content-center">
        {pageNumbers.map(number => (
          <button
            type="button"
            key={number}
            id={number}
            style={{
              listStyleType: 'none',
              marginRight: '20px',
              cursor: 'pointer',
              border: 'none',
              borderBottom: '3px solid black',
            }}
            onClick={() => onPaginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

peoplePagination.propTypes = {
  people: PropTypes.array,
  pplPerPage: PropTypes.number,
  onPaginate: PropTypes.func,
};

export default peoplePagination;
