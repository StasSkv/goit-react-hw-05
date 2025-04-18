import { useLocation, useNavigate, NavLink, Outlet, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { Suspense, useRef, useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { fetchMovieById } from '../../apiService';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const outletRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const from = location.state?.from || '/';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError('Фільм не знайдений');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    setError(error.message);
  }

  const activeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.movieDetailsWrap}>
      <button onClick={() => navigate(from)}>Go back</button>

      <div className={css.movieDetails}>
        {movie?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            width={300}
            height={300}
            alt={movie.original_title}
          />
        )}
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
