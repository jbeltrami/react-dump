import React from 'react';

const MovieFilter = () => (
  <div className="d-flex align-items-center justify-content-center flex-column">
    <h3>Filter movies</h3>
    <select name="Decade" id="movie-decade">
      <option>1980</option>
      <option>1990</option>
      <option>2000</option>
      <option>2010</option>
    </select>
  </div>
);

export default MovieFilter;
