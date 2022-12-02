import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'components/api';

const Reviews = () => {
  const [results, setResults] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getReviews(movieId)
      .then(response => setResults(response.data.results))
      .catch(console.log());
  }, [movieId]);
  return (
    <div>
      <h2>{results.length === 0 ? 'No reviews' : 'Reviews'}</h2>
      {results.length > 0 && (
        <ul>
          {results.map(({ author, id, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Reviews;
