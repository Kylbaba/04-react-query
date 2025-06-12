import axios from 'axios';
import type { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

interface TMDBResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  token: string
): Promise<Movie[]> => {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<TMDBResponse>(API_URL, config);

  return response.data.results;
};
