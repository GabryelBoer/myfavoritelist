import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import config from '../axios/config';
import MovieCard from '../components/MovieCard';
import MyPagination from '../components/MyPagination';

const apiKey = import.meta.env.VITE_API_KEY;
const searchURL = import.meta.env.VITE_SEARCH;

import './MoviesGrid.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  const getSearchMovies = async () => {
    try {
      const response = await config.searchFetch.get(
        `${searchURL}?${apiKey}&language=pt-BR&page=${page}&query=${query}`
      );
      const data = response.data;
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchMovies();
  }, [query]);

  useEffect(() => {
    getSearchMovies();
  }, [page]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      {totalPages > 1 && (
        <MyPagination
          total={totalPages}
          current={page}
          onChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default Search;
