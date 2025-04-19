import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../apiService';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const getSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      try {
        setIsLoading(true);
        const data = await fetchMoviesByQuery(query);
        setSearchResults(data.results);
      } catch (error) {
        setError('Download error');
        return error;
      } finally {
        setIsLoading(false);
      }
    };
    getSearchResults();
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={css.moviePage}>
      <SearchBar onSearch={handleSearch} initialQuery={query} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
      {searchResults.length === 0 && query && !isLoading && (
        <ErrorMessage message="Nothing found" />
      )}
    </div>
  );
};

export default MoviesPage;
