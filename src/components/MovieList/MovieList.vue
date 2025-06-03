<template>
  <div class="MovieList__wrapper">
    <transition name="fade">
      <div class="MovieList" v-if="movieList.length !== 0">
        <MovieListItem
          v-for="(movie, index) in movieList"
          :key="index"
          :movie="movie"
          v-on:select-movie="selectMovie"
        />
      </div>
      <div v-else-if="!loading && movieList.length === 0" class="MovieList__empty">
        {{ emptyTitle }}
      </div>
    </transition>
    <div v-if="loading" class="Spinner__overflow">
      <Spinner />
    </div>
  </div>
</template>

<script>
import MovieListItem from '../MovieListItem/MovieListItem.vue'
import Spinner from '../Spinner/Spinner.vue'
import * as request from '@/helpers/http'

export default {
  name: 'MovieList',
  props: {
    requestUrl: String,
    emptyListTitle: String,
    initialMovieList: Array,
  },
  data() {
    return {
      emptyTitle: this.emptyListTitle || 'No data here',
      movieList: this.initialMovieList || [],
      selectedMovie: null,
      currentPage: 1,
      totalPages: 0,
      loading: true,
    }
  },
  components: {
    MovieListItem,
    Spinner,
  },
  watch: {
    requestUrl(value) {
      if (value !== null && value !== undefined) {
        this.loadMovies()
      }
    },
    emptyListTitle(value) {
      this.emptyTitle = value
    },
    initialMovieList(value) {
      if (value !== null && value !== undefined) {
        this.movieList = value
        this.selectedMovie = null
      }

      this.$nextTick(() => {
        this.loading = false
      })
    },
  },
  methods: {
    loadMovies() {
      const params = { per_page: 10 }

      if (!this.requestUrl) return

      request
        .get(this.requestUrl, { params })
        .then((response) => {
          this.movieList = response.result.data
          this.currentPage = response.result.meta.current_page
        })
        .then(() => {
          window.scrollTo(0, 0)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.toggleLoading()
        })
    },
    selectMovie(movie) {
      this.selectedMovie = movie
    },
    unselectMovie() {
      this.selectedMovie = null
    },
  },
  mounted() {
    this.loadMovies()
  },
}
</script>

<style lang="scss">
@import 'MovieList';
</style>
