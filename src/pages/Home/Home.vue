<template>
  <div class="Home">
    <div class="Home__main-slider">
      <Slider ref="slider" :options="options">
        <div :key="index" :class="`slide--${index}`" v-for="(movie, index) in movieList">
          <MovieDetails :movie="movie" />
        </div>
      </Slider>
    </div>
    <div class="Home__slider-list">
      <MovieSlider
        category-title="Netflix Originals"
        request-url="discover/tv?api_key=7c3e2319f73271f06053b8573df6b971"
      />
      <MovieSlider
        category-title="Trending Now"
        request-url="trending/all/week?api_key=7c3e2319f73271f06053b8573df6b971"
      />
      <MovieSlider
        category-title="Recently Added"
        request-url="movie/now_playing?api_key=7c3e2319f73271f06053b8573df6b971"
      />
      <MovieSlider
        category-title="Top Rated"
        request-url="movie/top_rated?api_key=7c3e2319f73271f06053b8573df6b971"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Slider from '../../components/Slider/Slider.vue'
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue'
import MovieSlider from '../../components/MovieSlider/MovieSlider.vue'

export default {
  name: 'Home',
  data() {
    return {
      movieList: [],
      options: {
        dots: true,
        autoplay: true,
        slidesToShow: 1,
        autoplaySpeed: 5000,
        speed: 300,
        timing: 'ease-in-out',
      },
    }
  },
  computed: {
    // user() {
    //   return this.$store.getters.user
    // },
  },
  components: {
    Slider,
    MovieDetails,
    MovieSlider,
  },
  mounted() {
    this.$refs.slider.toggleLoading()
    this.$refs.slider.disableAutoPlay()
    axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=7c3e2319f73271f06053b8573df6b971')
      .then((response) => {
        this.movieList = response.data.results.splice(0, 10)
      })
      .then(() => {
        this.$refs.slider.reload()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.$refs.slider.toggleLoading()
      })
  },
}
</script>

<style lang="scss">
@import 'Home';
</style>
