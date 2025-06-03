<template>
  <div
    class="MovieListItem"
    :style="{
      backgroundImage: getBackgroundImageUrl(movie.backdrop_url),
    }"
  >
    <div class="MovieListItem__details" @click="selectMovie">
      <h3 class="MovieListItem__title line-clamp-2 !m-0">
        {{ movie.title ? movie.title : movie.name }}
      </h3>
      <MovieLabels :movie="movie" />
      <p class="MovieListItem__description line-clamp-2">
        {{ movie.description || movie.overview }}
      </p>
    </div>
  </div>
</template>

<script setup>
import MovieLabels from '../MovieLabels/MovieLabels.vue'
import useEmitter from '@/composables/useEmitter'
import useMovie from '@/composables/useMovie'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const emitter = useEmitter()
const { play, show } = useMovie()

const getBackgroundImageUrl = (url) => {
  return `url(${url})`
}
const selectMovie = () => {
  emitter.emit('openMovieModal', props.movie)
}
</script>

<style lang="scss">
@import 'MovieListItem';
</style>
