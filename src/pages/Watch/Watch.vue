<template>
  <div class="h-svh watch-video">
    <VideoPlayer :meta="movie" :options="videoOptions" :current-track="currentTrack" />
  </div>
</template>

<script setup>
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue'
import * as apiServices from '@/services'
import { CONTENT_TYPE } from '@/helpers/constants'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentVideoUuid = computed(() => route.params.uuid || '')
const contentType = computed(() => route.query.type || CONTENT_TYPE.MOVIE)
const currentTrack = computed(() => route.query.track || 0)

const videoOptions = ref({
  autoplay: true,
  controls: true,
  sources: [],
})

const movie = ref({})

// Reset và push các chất lượng video
const setVideoSources = (qualities) => {
  videoOptions.value.sources = []
  qualities?.forEach((quality) => {
    videoOptions.value.sources.push({
      ...quality,
      src: quality.video_url,
    })
  })
}

const fetchDetailMovie = async () => {
  console.log('Fetching movie details for UUID:', currentVideoUuid.value)

  try {
    if (!currentVideoUuid.value) return

    const response = await apiServices.getMovieByUuid(currentVideoUuid.value)
    movie.value = { ...response.result, type: contentType.value }
    setVideoSources(movie.value?.video_qualities)
  } catch (error) {
    console.error('Error fetching movie data:', error)
  }
}

const fetchDetailEpisode = async () => {
  try {
    if (!currentVideoUuid.value) return

    const response = await apiServices.getEpisodeByUuid(currentVideoUuid.value)
    movie.value = { ...response.result, type: contentType.value }
    setVideoSources(movie.value?.video_qualities)
  } catch (error) {
    console.error('Error fetching episode data:', error)
  }
}

// Theo dõi thay đổi UUID để load lại nội dung video
watch(
  () => route.params.uuid,
  () => {
    if (contentType.value == CONTENT_TYPE.MOVIE) {
      fetchDetailMovie()
    } else if (contentType.value == CONTENT_TYPE.SERIES) {
      fetchDetailEpisode()
    }
  },
  { immediate: true },
)
</script>
