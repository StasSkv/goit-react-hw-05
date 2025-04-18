import { NavLink } from 'react-router-dom';
import css from './MovieList.module.css';
import markImage from '../../images/mark.png';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <NavLink to={`/movies/${movie.id}`} state={{ movie }} className={css.link}>
            <h2>{movie.original_title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => (e.target.src = markImage)}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
