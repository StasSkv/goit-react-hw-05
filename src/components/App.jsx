import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import css from '../components/App.module.css';
import Navigation from './Navigation/Navigation';
import Loader from './Loader/Loader';
const ErrorMessage = lazy(() => import('./ErrorMessage/ErrorMessage'));
const Home = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <>
      <header className={css.header}>
        <Navigation />
      </header>
      <main className={css.main}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <ErrorMessage />
    </>
  );
};

export default App;
