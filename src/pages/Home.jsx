import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import config from '../axios/config';
import MovieCard from '../components/MovieCard';
import MyPagination from '../components/MyPagination';

import './MoviesGrid.css';

const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);

  const isScrolling = window.matchMedia('(max-width: 600px)').matches

  //Requisição API
  useEffect(() => {
    const getTopFilms = async () => {
      try {
        const response = await config.movieFetch.get(
          `top_rated?${apiKey}&language=pt-BR&page=${page}`
        );

        const data = response.data;
        {
          isScrolling && setTopMovies([...topMovies, ...data.results]);
        }
        {
          !isScrolling && setTopMovies(data.results);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    getTopFilms();
  }, [page]);

  
  //Scrolling infinito para celulares
  useEffect(() => {
    setTimeout(() => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPage((currentValue) => currentValue + 1);
        }
      });
      intersectionObserver.observe(document.querySelector('#sentinela-home'));

      return () => isScrolling && intersectionObserver.disconnect();
    }, 300);
  }, []);

  // Seta a página do pagination
  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, [isScrolling]);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <MyPagination
          total={totalPages - 42}
          current={page}
          onChangePage={handleChangePage}
        />
      )}

      {/* Sentinela para scrolling infinito */}
      {totalPages > 1 && <div id="sentinela-home"></div>}
    </div>
  );
};

export default Home;
