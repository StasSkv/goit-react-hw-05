import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../apiService';
import css from './MovieCast.module.css';
import markImage from '../../images/mark.png';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };
    if (movieId) {
      getCast();
    }
  }, [movieId]);
  if (cast.length === 0) {
    return (
      <div>
        <p>No information about cast</p>
      </div>
    );
  }

  return (
    <div className={css.cast}>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <p>{actor.name}</p>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : markImage
              }
              alt={actor.name}
              width={100}
              height={100}
              onError={(e) => {
                if (e.target.src !== markImage) {
                  e.target.src = markImage;
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
