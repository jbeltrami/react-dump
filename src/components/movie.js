import React from 'react';
import PropTypes from 'prop-types';

const Movie = props => {
  const { Poster, Title, Year, onFilter, onUnfilter } = props;

  return (
    <div className="col-lg-4">
      <img className="d-block w-100" src={Poster} alt="" />
      <h4>{Title}</h4>
      <p>{Year}</p>

      <button
        className="btn btn-danger btn-sm m-2"
        type="button"
        onClick={() => onFilter(Year)}
      >
        Filter by this decade
      </button>

      <button
        onClick={() => onUnfilter()}
        className="btn btn-success btn-sm m-2"
        type="button"
      >
        Remove Filter
      </button>
    </div>
  );
};

Movie.propTypes = {
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Year: PropTypes.string,
  onFilter: PropTypes.func,
  onUnfilter: PropTypes.func,
};

export default Movie;
