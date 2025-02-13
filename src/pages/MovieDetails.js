import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      loading: true,
    };
    this.requiredMovie = this.requiredMovie.bind(this);
  }

  componentDidMount() {
    this.requiredMovie();
  }

  async requiredMovie() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    movieAPI.getMovie(id)
      .then((movie) => {
        this.setState({
          movie,
          loading: false,
        });
      });
  }

  render() {
    const { movie } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;
    const { loading } = this.state;
    const more = (
      <div>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{`Title${title}`}</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
      </div>
    );
    return (
      <div data-testid="movie-details">
        {loading ? <Loading /> : more}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape,
  params: PropTypes.shape,
  id: PropTypes.string,
}.isRequired;

export default MovieDetails;
