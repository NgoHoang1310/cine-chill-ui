<template>
  <div class="Home">
    <div class="Home__main-slider">
      <Slider ref="sliderRef" :options="options">
        <div :key="index" :class="`slide--${index}`" v-for="(movie, index) in slideShowMovies">
          <MovieDetails :movie="movie" :enable-detail-button="true" :enable-overview="true" />
        </div>
      </Slider>
    </div>
    <div class="Home__slider-list" v-for="(slider, index) in sliders" :key="index">
      <MovieSlider
        :category-title="slider.title"
        :category-key="slider.key"
        :data="slider.movies"
        :meta="slider.meta"
      />
    </div>
  </div>
  <MovieModal />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Slider from '../../components/Slider/Slider.vue'
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue'
import MovieSlider from '../../components/MovieSlider/MovieSlider.vue'
import MovieModal from '@/components/Modal/MovieModal.vue'
import * as apiServices from '@/services'
import * as request from '@/helpers/http'

// Reactive state
const sliders = ref([
  {
    title: 'Phim lẻ hấp dẫn',
    key: 'hot-movies',
    movies: [],
    meta: null,
    requestUrl: '/core-service/movies',
  },
  {
    title: 'Series mới ra mắt',
    key: 'latest-series',
    movies: [],
    meta: null,
    requestUrl: '/core-service/series',
  },
])

const slideShowMovies = ref([])
const options = ref({
  dots: true,
  navButtons: false,
  autoplay: false,
  slidesToShow: 1,
  autoplaySpeed: 5000,
  speed: 300,
  timing: 'ease-in-out',
})

// ref cho component Slider để gọi methods trên đó
const sliderRef = ref(null)

const fetchSlideShowMovies = async () => {
  try {
    const response = await apiServices.getMovies({ per_page: 10 })
    slideShowMovies.value = response.result.data
    await nextTick()
    sliderRef.value.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sliderRef.value.toggleLoading()
  }
}

const fetchSliderMovies = async (key, params) => {
  const slider = sliders.value.find((s) => s.key === key)

  if (!slider) return

  try {
    const response = await request.get(slider.requestUrl, {
      params,
    })
    const { data, meta } = response.result

    slider.movies = data
    slider.meta = meta
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  sliderRef.value.toggleLoading()
  sliderRef.value.disableAutoPlay()

  fetchSlideShowMovies()
  fetchSliderMovies('hot-movies', { per_page: 10 })
  fetchSliderMovies('latest-series', { per_page: 10 })
})
</script>

<style lang="scss">
@import 'Home';
</style>
