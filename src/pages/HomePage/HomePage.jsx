import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../apiService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
        setError(null);
      } catch (error) {
        setError('Sorry, there was an error');
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
