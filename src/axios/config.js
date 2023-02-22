import axios from 'axios';

const moviesURL = import.meta.env.VITE_API;
const searchURL = import.meta.env.VITE_SEARCH;

axios.defaults.headers.post['Content-Type'] = 'application/json';

const movieFetch = axios.create({
  baseURL: `${moviesURL}`,
});

const searchFetch = axios.create({});

export default { movieFetch, searchFetch };
