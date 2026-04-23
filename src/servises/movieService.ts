import axios from 'axios';
import type { MoviesHTTPResponse } from '../types/movie';

const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string, page: number) => {
  const response = await axios.get<MoviesHTTPResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: { query, page },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
