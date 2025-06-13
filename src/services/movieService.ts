import axios from 'axios';
import { type Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<TMDBResponse> => {
  const token = import.meta.env.VITE_API_KEY;

  if (!token) {
    throw new Error('TMDB API token is not defined in environment variables');
  }

  const config = {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<TMDBResponse>(API_URL, config);
  return response.data;
};
