import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/Moviemodal';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

const TMDB_TOKEN = import.meta.env.VITE_API_KEY;

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setHasError(false);

      const fetchedMovies = await fetchMovies(query, TMDB_TOKEN);

      if (fetchedMovies.length === 0) {
        toast('No movies found for your request.');
        setMovies([]);
        return;
      }

      setMovies(fetchedMovies);
    } catch (error) {
      toast.error('An error occurred while fetching movies.');
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <main>
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <ErrorMessage />
        ) : (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;
