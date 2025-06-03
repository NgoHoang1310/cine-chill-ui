<template>
  <div class="series">
    <div class="fixed top-6 left-0 right-0 text-white p-8 z-10 flex items-center gap-6">
      <h1 class="text-3xl font-bold mb-6">Phim</h1>

      <!-- Dropdown -->
      <div class="relative inline-block text-left">
        <div>
          <button
            @click="toggleDropdown = !toggleDropdown"
            type="button"
            class="inline-flex items-center gap-2 justify-center w-full border border-solid border-gray-300 text-white text-sm px-3 py-1 rounded"
            id="genre-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {{ selectedGenre == '' ? 'Thể loại' : selectedGenre }}
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </button>
        </div>

        <!-- Dropdown menu -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="toggleDropdown"
            class="absolute left-0 z-10 mt-2 w-96 origin-top-left rounded-md bg-black shadow-lg ring-1 ring-white/10 focus:outline-none text-sm grid grid-cols-3 gap-4 px-4 py-3 text-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="genre-menu-button"
          >
            <span
              @click="applyGenreFilter(item?.name)"
              v-for="(item, index) in shared?.genres"
              :key="index"
              class="cursor-pointer hover:text-red-500 whitespace-nowrap truncate"
              :title="item?.name"
              >{{ item?.name }}</span
            >
          </div>
        </Transition>
      </div>
    </div>

    <div class="series__main-slider">
      <Slider ref="sliderRef" :options="options">
        <div :key="index" :class="`slide--${index}`" v-for="(movie, index) in slideShowMovies">
          <MovieDetails :movie="movie" :enable-detail-button="true" :enable-overview="true" />
        </div>
      </Slider>
    </div>
    <div class="series__slider-list">
      <h3 class="text-3xl font-bold mb-6 ml-7">Danh sách phim</h3>
      <MovieList :initial-movie-list="series" empty-list-title="Không có dữ liêu" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Slider from '../../components/Slider/Slider.vue'
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue'
import MovieList from '../../components/MovieList/MovieList.vue'
import * as apiServices from '@/services'

const { shared } = useStore()
const route = useRoute()
const router = useRouter()

const selectedGenre = ref(route.query.genre || '')
// Reactive state

const slideShowMovies = ref([])
const options = ref({
  dots: true,
  navButtons: false,
  autoplay: true,
  slidesToShow: 1,
  autoplaySpeed: 5000,
  speed: 300,
  timing: 'ease-in-out',
})

const series = ref(null)

// ref cho component Slider để gọi methods trên đó
const sliderRef = ref(null)
const toggleDropdown = ref(false)

const fetchSlideShowMovies = async () => {
  try {
    const response = await apiServices.getMovies({ per_page: 5 })
    slideShowMovies.value = response.result.data
    await nextTick()
    sliderRef.value.reload()
  } catch (error) {
    console.error(error)
  } finally {
    sliderRef.value.toggleLoading()
  }
}

const fetchSeries = async (params) => {
  try {
    const response = await apiServices.getMovies(params)
    series.value = response.result.data
  } catch (error) {
    console.error(error)
  }
}

const applyGenreFilter = (genre) => {
  toggleDropdown.value = false
  selectedGenre.value = genre
  router.push({ query: { ...route.query, genre } })
}

onMounted(async () => {
  sliderRef.value.toggleLoading()
  sliderRef.value.disableAutoPlay()

  fetchSlideShowMovies()
  fetchSeries({ per_page: 20, genre: selectedGenre.value })
})

watch(
  () => route.query.genre,
  (newGenre) => {
    selectedGenre.value = newGenre || ''
    fetchSeries({ per_page: 20, genre: newGenre })
  },
  { immediate: true },
)
</script>

<style lang="scss">
@import 'Movies.scss';
</style>
