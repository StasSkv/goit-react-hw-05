import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchMovieById, fetchMoviesByQuery } from '../../apiService';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css';
import Loader from "../../components/Loader/Loader"

const MoviesPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get('query') || '';

  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true);
      try {
        if (movieId) {
          const data = await fetchMovieById(movieId);
          setMovie(data);
        }
      } catch (error) {
        setError('Download error');
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  useEffect(() => {
    const getSearchResults = async () => {
      if (!queryFromURL) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchMoviesByQuery(queryFromURL);
        setSearchResults(data.results);
      } catch (error) {
        setError('Download error');
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    getSearchResults();
  }, [queryFromURL]);

  const handleSearch = (newQuery) => {
    navigate(`?query=${newQuery}`);
  };

  return (
    <div className={css.moviePage}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <SearchBar onSearch={handleSearch} initialQuery={queryFromURL} />
      {movie && !queryFromURL && (
        <div className={css.movieDetails}>
          <h1>{movie.original_title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className={css.moviePoster}
          />
          <p>{movie.overview}</p>
          <p>Release: {movie.release_date}</p>
          <p>Average: {movie.vote_average}</p>
        </div>
      )}
      {searchResults.length > 0 && !movie && <MovieList movies={searchResults} />}
      {searchResults.length === 0 && queryFromURL && !movie && (
        <ErrorMessage message="Nothing found" />
      )}
    </div>
  );
};

export default MoviesPage;
