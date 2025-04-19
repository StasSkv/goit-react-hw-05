import { useLocation, NavLink, Outlet, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { Suspense, useRef, useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { fetchMovieById } from '../../apiService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import markImage from '../../images/mark.png';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
        return error;
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={'we have a problem'} />;
  if (!movie) return null;
  const { original_title, overview, release_date, poster_path, vote_average, original_language } =
    movie;

  const activeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.movieDetailsWrap}>
      <NavLink className={css.goHome} to={from.current}>
        Go back
      </NavLink>
      <div className={css.movieDetails}>
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : markImage}
          width={300}
          height={300}
          alt={original_title}
        />

        <div className={css.description}>
          <h2>{original_title}</h2>
          <p>{overview}</p>
          <p>
            <span>Release:</span> {release_date}
          </p>
          <p>
            <span>Average:</span> {vote_average}
          </p>
          <p>
            <span>Language:</span> {original_language}
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

      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
