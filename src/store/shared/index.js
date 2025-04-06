import axios from 'axios';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    loading: false,
    configuration: null,
    genres: null,
    error: null,
  }),
  actions: {
    setLoading(payload) {
      this.loading = payload;
    },
    setError(payload) {
      this.error = payload;
    },
    clearError() {
      this.error = null;
    },
    setConfiguration() {
      axios.get('https://api.themoviedb.org/3/configuration?api_key=7c3e2319f73271f06053b8573df6b971')
        .then(response => {
          this.configuration = response.data;
        })
        .catch(error => {
          this.setError(error);
        });
    },
    async setGenres() {
      const genres = {
        tv: [],
        movies: []
      };

      try {
        const movieResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7c3e2319f73271f06053b8573df6b971');
        genres.movies = movieResponse.data.genres;
      } catch (error) {
        this.setError(error);
      }

      try {
        const tvResponse = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=7c3e2319f73271f06053b8573df6b971');
        genres.tv = tvResponse.data.genres;
      } catch (error) {
        this.setError(error);
      }

      this.genres = genres;
    }
  },
  getters: {
    configuration: (state) => state.configuration,
    genres: (state) => state.genres,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
});