<template>
  <div class="MovieSlider__wrapper">
    <h2 class="MovieSlider__title">{{ categoryTitle }}</h2>
    <div v-click-outside="unselectMovie">
      <Slider
        ref="sliderRef"
        :options="options"
        :class="{ 'Slider--has-selected': selectedMovie }"
        @load-more="loadMore"
      >
        <div v-for="(movie, index) in movies" :key="index" :class="`slide--${index}`">
          <MovieSliderItem :movie="movie" v-on:select-movie="selectMovie" />
        </div>
      </Slider>
      <transition name="fade-in-up">
        <div v-if="selectedMovie" class="MovieSlider__details">
          <div @click.stop>
            <MovieDetails :movie="selectedMovie" />
            <button type="button" class="btn--close" @click="unselectMovie" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Slider from '../../components/Slider/Slider.vue'
import MovieSliderItem from '../../components/MovieSliderItem/MovieSliderItem.vue'
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue'

// Props
const props = defineProps({
  data: Array,
  categoryTitle: String,
  categoryKey: String,
  meta: Object,
})

const emit = defineEmits(['load-more'])

// Refs & state
const movies = ref([])
const selectedMovie = ref(null)
const sliderRef = ref(null)

const options = {
  dots: false,
  navButtons: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  mobileFirst: false,
  speed: 300,
  timing: 'ease-in-out',
  extraClass: 'MovieSlider',
  responsive: [
    { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 } },
  ],
}

// Methods
function selectMovie(movie) {
  if (selectedMovie.value && selectedMovie.value.id === movie.id) {
    selectedMovie.value = null
  } else {
    selectedMovie.value = movie
  }
}

function unselectMovie() {
  selectedMovie.value = null
}

function loadMore() {
  if (props.meta?.current_page < props.meta?.last_page) {
    emit('load-more', { key: props.categoryKey, page: props.meta.current_page + 1 })
  }
}

// Lifecycle
watch(
  () => props.data,
  async (newValue) => {
    sliderRef.value.toggleLoading()
    movies.value = newValue
    await nextTick()
    sliderRef.value.reload()
    sliderRef.value.toggleLoading()
  },
)
</script>

<style lang="scss">
@import 'MovieSlider';
</style>
