<template>
  <div class="page__content">
    <h1 class="page__title">
      Movies <span v-if="categoryTitle">({{ categoryTitle }})</span>
    </h1>
    <MovieList
      :request-url="
        'discover/movie?api_key=7c3e2319f73271f06053b8573df6b971&with_genres=' + movieGenresId
      "
    />
  </div>
</template>

<script lang="ts">
import MovieList from '@/components/MovieList/MovieList.vue'

export default {
  name: 'Movies',
  data() {
    return {
      categoryTitle: '',
      movieGenresId: +this.$route.params.id,
    }
  },
  computed: {
    query() {
      return this.$route.params.id
    },
    genres() {
      return this.$store.getters.genres
    },
  },
  components: {
    MovieList,
  },
  watch: {
    query(value) {
      if (value !== null && value !== undefined) {
        this.movieGenresId = +this.$route.params.id
        this.setTitle()
      }
    },
    genres(value) {
      if (value !== null && value !== undefined) {
        this.setTitle()
      }
    },
  },
  methods: {
    setTitle() {
      this.categoryTitle = this.genres.movies.find(({ id }) => id === this.movieGenresId).name
    },
  },
  mounted() {
    if (this.$store.getters.genres) {
      this.setTitle()
    }
  },
}
</script>
