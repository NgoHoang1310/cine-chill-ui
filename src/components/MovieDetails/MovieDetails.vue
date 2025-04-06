<template>
  <div
    class="MovieDetails"
    :style="{ backgroundImage: getBackgroundImageUrl(movie.backdrop_path, 2) }"
  >
    <div class="MovieDetails__fade--top" />
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{ movie.title || movie.name }}
      </h1>
      <MovieLabels :movie="movie" />
      <div class="MovieDetails__details">
        <p class="MovieDetails__description">
          {{ movie.overview }}
        </p>
        <p class="MovieDetails__description">
          Genres: <span class="MovieDetails__description--white">{{ movieGenres }}</span>
        </p>
        <button
          v-if="!isMovieInMyList"
          type="button"
          class="btn MovieDetails__btn"
          @click="addMovieToMyList"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="MovieDetails__btn-icon" fixed-width />
          My List
        </button>
        <button v-else type="button" class="btn MovieDetails__btn" @click="removeMovieFromMyList">
          <font-awesome-icon :icon="['fas', 'minus']" class="MovieDetails__btn-icon" fixed-width />
          My List
        </button>
      </div>
    </div>
    <div class="MovieDetails__fade--bottom" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import MovieLabels from '../MovieLabels/MovieLabels.vue'
import getImageUrl from '../../helpers/getImageUrl'

const props = defineProps<{
  movie: {
    id: number
    name: string
    title: string
    overview: string
    genre_ids: number[]
    backdrop_path: string
  }
}>()

const store = useStore()

const movieGenres = computed(() => {
  if (!store.shared.genres) return ''
  return store.shared.genres.movies
    .filter(({ id }: { id: number }) => props.movie.genre_ids.includes(id))
    .map(({ name }: { name: string }) => name)
    .join(', ')
})

const isMovieInMyList = computed(() => {
  return store.myList.myList?.find(({ id }: { id: number }) => id === props.movie.id)
})

const getBackgroundImageUrl = (url: string, size: number) => {
  return `url(${getImageUrl(url, size, 'backdrop')})`
}

const addMovieToMyList = () => {
  store.myList.addMovieToMyList({
    movie: props.movie,
  })
}

const removeMovieFromMyList = () => {
  store.myList.removeMovieFromMyList({
    movie: props.movie,
  })
}
</script>

<style lang="scss">
@import 'MovieDetails';
</style>
