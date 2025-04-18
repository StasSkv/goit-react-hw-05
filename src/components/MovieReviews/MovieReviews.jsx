import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchMovieReviews } from '../../apiService';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useOutletContext();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchMovieReviews(movieId);
      setReviews(data.results);
    };

    if (movieId) {
      getReviews();
    }
  }, [movieId]);

  if (reviews.length === 0) {
    return <div><p>not reviews</p></div>;
  }

  return (
    <div className={css.reviews}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
