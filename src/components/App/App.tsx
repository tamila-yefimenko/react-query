import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['query', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const handleSearch = async (topic: string) => {
    if (!topic.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    setQuery(topic);
    setPage(1);
  };

  const totalPages = data?.total_pages ?? 0;

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
      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
      {data && <MovieGrid movies={data.results} onOpen={openModal} />}

      {isOpen && movie && <MovieModal movie={movie} onClose={onClose} />}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data?.results.length === 0 && (
        <p className={css.text}>No movies found for your request.</p>
      )}
      <Toaster />
    </>
  );
}

export default App;
