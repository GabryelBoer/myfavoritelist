import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import config from '../axios/config';
import MovieCard from '../components/MovieCard';

const apiKey = import.meta.env.VITE_API_KEY;
const searchURL = import.meta.env.VITE_SEARCH;

import './MoviesGrid.css';

const Search = () => {
  
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [queried, SetQueried] = useState(true)
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  // Função fetch na requisição na API
  const getSearchMovies = async () => { 
    try {
      const response = await config.searchFetch.get(
        `${searchURL}?${apiKey}&language=pt-BR&page=${page}&query=${query}`
      );

      const data = response.data;

      if(queried) {
        setMovies(data.results)
      }
      else if(!queried) {
        setMovies([...movies, ...data.results])
      }        
      
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  // Realiza a requisição na api e atualiza a página quando atualizar o query
  useEffect(() => {
    setPage(1)
    SetQueried(true)
    {queried && getSearchMovies()}
  }, [query])

  useEffect(() =>{
    getSearchMovies()
  }, [queried])

  //Scrolling infinito para celulares
  useEffect(() => {
    setTimeout(() => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          SetQueried(false)
          setPage((currentValue) => currentValue + 1);
        }
      });
      intersectionObserver.observe(document.querySelector('#sentinela-search'));
      return () => intersectionObserver.disconnect();
    }, 300);
  }, []);

  // Faz a requisição na api quando mudar de página
  useEffect(() => {
    getSearchMovies();
  }, [page]);
  
  return (
    <div id='container' className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Sentinela para scrolling infinito */}
      {totalPages > 1 && <div id="sentinela-search"></div>}
    </div>
  )
};

export default Search;
