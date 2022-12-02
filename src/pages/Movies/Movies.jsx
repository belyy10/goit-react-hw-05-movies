import { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchFilm } from 'components/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (searchQuery !== '') {
      searchFilm(searchQuery)
        .then(response => {
          if (response.data.results === 0) {
            Notify.failure(
              `Sorry, there are no movies matching your search query. Please try again.`
            );
            return;
          }
          if (response.data.results.length > 0) {
            setMovies([...response.data.results]);
          }
        })
        .catch(e => console.log(e.message));
    }
  }, [searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams(
      e.target.elements.query.value !== ''
        ? { query: e.target.elements.query.value }
        : {}
    );
    setMovies([]);
    e.target.elements.query.value = '';
  };

  // const visibleMovies = movies.filter(movies =>
  //   movies.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="query" type="text" placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && (
        <div>
          {movies.map(({ id, title, name }) => (
            <NavLink key={id} to={`${id}`} state={{ from: location }}>
              <p>{title ?? name}</p>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
