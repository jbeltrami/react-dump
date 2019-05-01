import React, { Component } from 'react';
import axios from 'axios';
import Movie from './movie';
import MovieFilter from './movieFilter';

class Movies extends Component {
  state = {
    movies: ['test'],
  };

  componentDidMount() {
    this.getAllMovies();
  }

  getAllMovies = () => {
    axios.get('http://www.omdbapi.com/?s=batman&apikey=bec4b159').then(res => {
      const apiResponse = res.data.Search;

      apiResponse.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

      this.setState(() => ({
        movies: [...apiResponse],
      }));
    });
  };

  handleYearFilter = year => {
    const { movies } = this.state;
    const decade = year[2];

    const filteredMovies = movies.filter(movie => movie.Year[2] === decade);

    this.setState({ movies: filteredMovies });
  };

  render() {
    const { movies } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Batman Movies</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex align-items-centet justify-content-center my-5">
            <MovieFilter />
          </div>
        </div>

        <div className="row">
          {movies.map((movie, index) => (
            <Movie
              {...movie}
              id={index}
              onFilter={this.handleYearFilter}
              onUnfilter={this.getAllMovies}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Movies.propTypes = {
//   Search: PropTypes.object,
// };

export default Movies;
