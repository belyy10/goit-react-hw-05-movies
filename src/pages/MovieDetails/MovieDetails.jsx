import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { getMovieById } from 'components/api';
import { useEffect, useState } from 'react';
import { Container, Img, AddInfo } from './MovieDetails.styled';
import { BackLink } from 'components/BackLink/BackLink';

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    getMovieById(movieId)
      .then(response => setMovies(response.data))
      .catch(console.log);
  }, [movieId]);

  return (
    <main>
      <BackLink to={backLinkHref}>Go back</BackLink>
      <Container>
        <Img
          src={'https://image.tmdb.org/t/p/w500' + movies.poster_path}
          alt={movies.title}
          width={250}
        />

        <div>
          <h2>
            {movies.title} ({new Date(movies.release_date).getFullYear()})
          </h2>
          <div>
            <h3>Overview</h3>
            <p>{movies.overview}</p>
            <h3>Genres</h3>
            <p>
              {movies.genres &&
                movies.genres.map(genre => genre.name).join(' , ')}
            </p>
          </div>
        </div>
      </Container>
      <AddInfo>
        <h3>Additional Info</h3>
        <Link to="cast" state={{ from: backLinkHref }}>
          <p>Cast</p>
        </Link>
        <Link to="reviews" state={{ from: backLinkHref }}>
          <p>Reviews</p>
        </Link>
      </AddInfo>
      <Outlet />
    </main>
  );
};

export default MovieDetails;
