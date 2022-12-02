import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Main } from 'pages/Home/Home.styled';
import { trendingFetch } from 'components/api';

const Home = () => {
  const [trendingFilm, setTrendingFIlm] = useState([]);
  useEffect(() => {
    trendingFetch()
      .then(setTrendingFIlm)
      .catch(e => console.log(e.message));
  }, []);
  return (
    <Main>
      <h1>Trending Today</h1>
      <div>
        {trendingFilm.map(({ id, title, name }) => (
          <NavLink key={id} to={`movies/${id}`}>
            <p>{title ?? name}</p>
          </NavLink>
        ))}
      </div>
    </Main>
  );
};

export default Home;
