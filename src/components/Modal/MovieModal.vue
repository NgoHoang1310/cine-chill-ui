<template>
  <ModalLayout :model-value="show" @update:model-value="show = $event">
    <MovieDetails
      style="height: 479px; min-height: initial"
      :movie="movie"
      :enable-my-list-button="true"
      :remove-transiton-effect="true"
    />
    <div class="bg-blend-darken text-[#e5e5e5] font-sans p-6 space-y-6 text-base leading-relaxed">
      <!-- Thông tin tổng quan -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Cột trái -->
        <div class="md:col-span-2 space-y-4">
          <!-- Dòng thông tin -->
          <div class="flex items-center gap-2 text-sm font-medium text-gray-400 flex-wrap">
            <span>{{ movie.release }}</span>
            <span>•</span>
            <span v-if="movie.type === CONTENT_TYPE.MOVIE">{{
              convertMinutesToHours(movie.duration)
            }}</span>
            <span v-if="movie.type === CONTENT_TYPE.SERIES"
              >{{ movie.seasons?.length == 0 ? 1 : movie.seasons?.length }} mùa</span
            >
            <span class="px-1 py-0.5 border border-solid border-gray-500 rounded text-xs">HD</span>
          </div>

          <!-- Rating và cảnh báo -->
          <div class="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-300">
            <span class="border border-solid border-gray-500 px-1.5 py-0.5 rounded">{{
              movie.age.key
            }}</span>
            <span>{{ movie.genres?.map((item) => item.name).join(', ') }}</span>
          </div>

          <!-- Mùa mới -->
          <h2 class="text-xl font-semibold text-white">Mô tả chi tiết</h2>

          <!-- Mô tả -->
          <p class="text-base text-justify font-medium text-gray-300 max-w-xl">
            {{ movie.description }}
          </p>
        </div>

        <!-- Cột phải -->
        <div class="text-sm space-y-2">
          <p class="text-white">
            <span class="text-gray-400">Đạo diễn:</span>
            {{ movie.directors }}
          </p>
          <p class="text-white">
            <span class="text-gray-400">Diễn viên:</span>
            {{ movie.actors }}
          </p>
          <p class="text-white">
            <span class="text-gray-400">Thể loại:</span>
            {{ movie.genres?.map((item) => item.name).join(', ') }}
          </p>
        </div>
      </div>

      <!-- Phần tập -->
      <EpisodeList
        v-if="movie.type === CONTENT_TYPE.SERIES"
        :series="movie"
        :seasons="movie?.seasons"
      />
      <CardList :contents="cards" />
    </div>
  </ModalLayout>
</template>

<script setup>
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue'
import EpisodeList from '../EpisodeList/EpisodeList.vue'
import CardList from '../CardList/CardList.vue'
import ModalLayout from './ModalLayout.vue'
import useEmitter from '@/composables/useEmitter'
import { CONTENT_TYPE } from '@/helpers/constants'
import { convertMinutesToHours } from '@/helpers/commons'

const emitter = useEmitter()

const show = ref(false)
const movie = ref({})
const cards = ref([])

onMounted(() => {
  emitter.on('openMovieModal', (value) => {
    show.value = true
    movie.value = value
  })
})

watch(movie, (newValue) => {
  if (newValue.type === CONTENT_TYPE.MOVIE && newValue.trailer_url) {
    cards.value = [{ title: newValue.title, trailer_url: newValue.trailer_url }]
  }
})

watch(show, (newValue) => {
  if (!newValue) {
    movie.value = {}
    cards.value = []
  }
})

onBeforeUnmount(() => {
  emitter.off('openMovieModal')
})
</script>
