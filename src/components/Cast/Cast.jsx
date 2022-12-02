import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from 'components/api';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getCast(movieId)
      .then(response => setCast([...response.data.cast]))
      .catch(console.log());
  }, [movieId]);
  return (
    <div>
      {cast.length > 0 && (
        <ul>
          {cast.map(({ name, id, profile_path, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? 'https://image.tmdb.org/t/p/w500' + profile_path
                    : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
                }
                alt={name}
                width={200}
              />
              <h3>{name}</h3>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
