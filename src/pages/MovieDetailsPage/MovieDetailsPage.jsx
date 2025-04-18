import { useLocation, useNavigate, NavLink, Outlet } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { Suspense, useRef, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const outletRef = useRef(null);
  const movie = location.state?.movie;
  const from = location.state?.from || '/';
  const movieId = movie?.id;

  const activeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

useEffect(() => {
  setTimeout(() => {
    if (outletRef.current) {
      outletRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 500);
}, [location.pathname]);

  return (
    <div className={css.movieDetailsWrap}>
      <button onClick={() => navigate(from)}>Go back</button>

      <div className={css.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          width={300}
          height={300}
          alt={movie.original_title}
        />
        <div className={css.description}>
          <h2>{movie.original_title}</h2>
          <p>{movie.overview}</p>
          <p>
            <span>Release:</span> {movie.release_date}
          </p>
          <p>
            <span>Average:</span> {movie.vote_average}
          </p>
          <p>
            <span>Language:</span> {movie.original_language}
          </p>
        </div>
      </div>
      <nav>
        <NavLink to={`reviews`} state={{ movie, from }} className={activeLinkClass}>
          Reviews
        </NavLink>
        <NavLink to={`cast`} state={{ movie, from }} className={activeLinkClass}>
          Cast
        </NavLink>
      </nav>

      <div ref={outletRef}>
        <Suspense fallback={<Loader />}>
          <Outlet context={{ movieId }} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
