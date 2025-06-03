import axios from 'axios';
import { defineStore } from 'pinia';
import * as apiServices from '@/services'

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
    try {
      const response = await apiServices.getGenres({ per_page: 18 });
      genres.value = response.result.data;
    } catch (error) {
      setError(error);
    }
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