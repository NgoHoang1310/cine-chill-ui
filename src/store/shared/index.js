import axios from 'axios';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', () => {
  const configuration = ref(null);
  const genres = ref(null);
  const error = ref(null);


  const setError = (payload) => {
    console.log(payload);

    error.value = payload;
  }

  const clearError = () => {
    error.value = null;
  }

  const setConfiguration = () => {
    axios.get('https://api.themoviedb.org/3/configuration?api_key=7c3e2319f73271f06053b8573df6b971')
      .then(response => {
        configuration.value = response.data;
      })
      .catch(error => {
        setError(error);
      });
  }

  const setGenres = async () => {
    const genres = {
      tv: [],
      movies: []
    };

    try {
      const movieResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7c3e2319f73271f06053b8573df6b971');
      genres.movies = movieResponse.data.genres;
    } catch (error) {
      setError(error);
    }

    try {
      const tvResponse = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=7c3e2319f73271f06053b8573df6b971');
      genres.tv = tvResponse.data.genres;
    } catch (error) {
      setError(error);
    }

    genres.value = genres;
  }

  return {
    configuration,
    genres,
    error,
    setError,
    clearError,
    setConfiguration,
    setGenres
  };
});