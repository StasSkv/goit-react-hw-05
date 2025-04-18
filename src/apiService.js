import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTgwZmIyOGE3ZDliNjM1MzRhY2NiOTllZmNlYWMxNiIsIm5iZiI6MTc0NDY2MjgwOC43OTIsInN1YiI6IjY3ZmQ3MTE4YWFjZjdjZmIyNjk5OWRiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3eiShfdZP3zaytMWOEXlq8DoDNP-BrhZk0e6MYh79CU';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchMoviesByQuery = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: { query },
  });
  return response.data;
};

export const fetchMovieById = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}`);
  return response.data;
};

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};
