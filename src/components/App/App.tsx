import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleSearch = async (data: string) => {
    if (!data.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    setMovies([]);
    setPage(1);
    setQuery(data);
  };

  const handleSetPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setIsEmpty(false);
        const { results, total_pages } = await fetchMovies(query, page);

        if (!results.length) {
          setIsEmpty(true);
        }

        setMovies(prev => [...prev, ...results]);
        setTotalPages(total_pages);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const openModal = (oneMovie: Movie) => {
    setMovie(oneMovie);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && <MovieGrid movies={movies} onOpen={openModal} />}
      {page < totalPages && movies.length && (
        <button onClick={handleSetPage}>Load more</button>
      )}
      {isOpen && movie && <MovieModal movie={movie} onClose={onClose} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p className={css.text}>No movies found for your request.</p>}
      <Toaster />
    </>
  );
}

export default App;
