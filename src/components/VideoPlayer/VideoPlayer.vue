<template>
  <div
    class="relative w-full h-full bg-black text-white overflow-hidden"
    @mousemove="showControlsTemporarily"
    @touchstart="showControlsTemporarily"
  >
    <!-- Video -->
    <video
      ref="videoRef"
      class="w-full h-full object-contain"
      @timeupdate="updateTime"
      @loadedmetadata="setDuration"
      @click="togglePlay"
    ></video>

    <!-- Controls Overlay -->
    <transition name="fade">
      <div
        v-show="controlsVisible"
        class="absolute inset-0 flex flex-col justify-between bg-black/40 z-20"
      >
        <!-- Top bar -->
        <div class="flex justify-between items-center px-8 py-6 text-4xl">
          <button @click="handleBackClick" class="text-white">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </button>
        </div>

        <!-- Center (optional future controls) -->
        <div class="flex-grow flex justify-center items-center">
          <!-- Có thể thêm biểu tượng Play to ở giữa -->
          <button
            type="button"
            class="btn btn--play MovieSliderItem__btn !w-[60px] !h-[60px] !bg-black/40 !text-white !border !border-gray-300"
            @click="togglePlay"
          >
            <font-awesome-icon
              v-if="!isPlaying"
              :icon="['fas', 'play']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'pause']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
          </button>

          <transition name="fade">
            <div
              @mouseleave="showEpisodeList = false"
              v-if="showEpisodeList"
              class="absolute overflow-y-auto z-30 -bottom-10 rounded-sm right-4 mb-2 w-[700px] h-[500px] bg-[#2b2b2b] border border-gray-700 p-4"
            >
              <h2 class="text-lg font-semibold mb-4">Danh sách tập</h2>

              <!-- Episode 1 -->
              <EpisodeList
                :series="movie?.series"
                :seasons="movie?.series?.seasons"
                :current-episode="movie"
              />

              <!-- Các tập khác tương tự -->
            </div>
          </transition>
          <transition name="fade">
            <div
              @mouseleave="showQualityList = false"
              v-if="showQualityList"
              class="absolute overflow-y-auto z-30 -bottom-10 rounded-sm right-4 mb-2 w-[200px] bg-[#2b2b2b] border border-gray-700 py-4"
            >
              <h2 class="text-lg font-semibold mb-4 pl-4 pr-4">Chất lượng video</h2>
              <ul>
                <li
                  v-for="[key, item] in Object.entries(QUALITIES)"
                  :key="key"
                  :class="[
                    'py-2 px-4 hover:bg-gray-700 cursor-pointer',
                    !isQualityAvailable(key) && 'opacity-55 cursor-not-allowed',
                  ]"
                  @click="onQualityClick(key)"
                >
                  <span class="w-6 inline-block">
                    <font-awesome-icon
                      v-if="
                        currentQuality?.quality === +key ||
                        (![0, 1, 2].includes(currentQuality?.quality) && key === 'default')
                      "
                      :icon="['fas', 'check']"
                    />
                  </span>
                  {{ item.value }}
                  <span
                    v-if="!isQualityAvailable(key) && QUALITY_BADGES[key]"
                    class="text-xs text-white px-2 py-0.5 rounded-full"
                    :class="QUALITY_BADGES[key].class"
                  >
                    {{ QUALITY_BADGES[key].text }}
                  </span>
                </li>
              </ul>

              <!-- Các tập khác tương tự -->
            </div>
          </transition>
        </div>

        <!-- Bottom bar -->
        <div style="gap: 1.8rem" class="flex flex-col px-6 pb-8">
          <!-- Progress -->
          <ProgressBar
            :class="showEpisodeList ? 'invisible' : ''"
            :currentTime="currentTime"
            :duration="duration"
            :buffered="bufferedTime"
            :videoElement="videoRef"
            @seek="seek"
          />

          <!-- Info + Controls -->
          <div class="flex justify-between items-center text-base">
            <!-- Left -->
            <div class="flex items-center gap-6 text-4xl">
              <button @click="togglePlay">
                <span class="text-white" v-if="!isPlaying"
                  ><font-awesome-icon :icon="['fas', 'play']"
                /></span>
                <span class="text-white" v-else
                  ><font-awesome-icon :icon="['fas', 'pause']"
                /></span>
              </button>
              <button class="text-white" @click="seek(currentTime - 10)">
                <SeekPrevIcon />
              </button>
              <button class="text-white" @click="seek(currentTime + 10)"><SeekNextIcon /></button>
              <button class="text-white" @click="toggleMute">
                <span v-if="isMuted"><MuteIcon /></span>
                <span v-else><SpeakerIcon /></span>
              </button>
            </div>

            <!-- Title -->
            <div class="text-md font-semibold truncate mx-2">
              {{ title }}
            </div>

            <!-- Right -->
            <div class="flex items-center gap-5 text-4xl">
              <button v-if="movie?.type === CONTENT_TYPE.SERIES" class="text-white">
                <ForwardIcon />
              </button>
              <button
                v-if="movie?.type === CONTENT_TYPE.SERIES"
                class="text-white"
                @mouseenter="
                  () => {
                    showEpisodeList = true
                    showQualityList = false
                  }
                "
              >
                <MultiLayerIcon />
              </button>
              <button class="text-white" @click="changeSpeed"><SpeedIcon /></button>
              <button
                @mouseenter="
                  () => {
                    showQualityList = true
                    showEpisodeList = false
                  }
                "
                class="text-white"
              >
                <font-awesome-icon :icon="['fas', 'sliders-h']" />
              </button>
              <button class="text-white" @click="toggleFullscreen">
                <font-awesome-icon :icon="['fas', 'compress']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <Transition>
      <div
        v-show="isLoading"
        class="absolute inset-0 flex flex-col justify-between bg-black/40 z-30"
      >
        <div class="flex-grow flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Hls from 'hls.js'

import SeekNextIcon from '@/components/Icon/SeekNextIcon.vue'
import SeekPrevIcon from '@/components/Icon/SeekPrevIcon.vue'
import SpeakerIcon from '@/components/Icon/SpeakerIcon.vue'
import MuteIcon from '@/components/Icon/MuteIcon.vue'
import ForwardIcon from '@/components/Icon/ForwardIcon.vue'
import MultiLayerIcon from '@/components/Icon/MultiLayerIcon.vue'
import SpeedIcon from '@/components/Icon/SpeedIcon.vue'
import Spinner from '@/components/Spinner/Spinner.vue'

import ProgressBar from '../ProgressBar/ProgressBar.vue'
import EpisodeList from '../EpisodeList/EpisodeList.vue'

import router from '@/router'
import useEmitter from '@/composables/useEmitter'
import { CONTENT_TYPE, QUALITIES } from '@/helpers/constants'
import * as apiServices from '@/services'

const props = defineProps({
  options: {
    autoPlay: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    sources: {
      type: Array,
      default: () => [],
    },
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
  currentTrack: {
    type: Number,
    default: 0,
  },
})

const QUALITY_BADGES = {
  0: { text: 'Cao cấp', class: 'bg-amber-600' },
  1: { text: 'Tiêu chuẩn', class: 'bg-gray-500' },
}

const emitter = useEmitter()

const videoRef = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false)
const isMuted = ref(false)
const controlsVisible = ref(true)
const showEpisodeList = ref(false)
const showQualityList = ref(false)

const duration = ref(0)
const currentTime = ref(0)
const savedTime = useLocalStorage('video-current-time', 0)
const playbackRate = ref(1)
const bufferedTime = ref(0)
const currentQuality = ref('default')

let controlsTimeout = null
let mouseMoving = false
let mouseMoveTimeout = null
let isMarkedFinished = false

function togglePlay() {
  const video = videoRef.value
  if (video.paused) {
    video.play()
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

function onPlay() {
  isPlaying.value = true
}
function onPause() {
  isPlaying.value = false
}

function seek(time) {
  videoRef.value.currentTime = time
  currentTime.value = time
}

function toggleMute() {
  const video = videoRef.value
  video.muted = !video.muted
  isMuted.value = video.muted
}

function changeSpeed() {
  const rates = [1, 1.5, 2]
  const nextIndex = (rates.indexOf(playbackRate.value) + 1) % rates.length
  playbackRate.value = rates[nextIndex]
  videoRef.value.playbackRate = playbackRate.value
}

function toggleFullscreen() {
  const el = videoRef.value.parentElement
  if (!document.fullscreenElement) el.requestFullscreen()
  else document.exitFullscreen()
}

function updateTime() {
  currentTime.value = videoRef.value?.currentTime
  saveTime(videoRef.value?.currentTime)
}

function updateBuffered() {
  const video = videoRef.value
  if (!video || !video.buffered.length) return
  bufferedTime.value = video.buffered.end(video.buffered.length - 1)
}

function setDuration() {
  duration.value = videoRef.value.duration
}

function showControlsTemporarily() {
  controlsVisible.value = true
  clearTimeout(controlsTimeout)
  clearTimeout(mouseMoveTimeout)

  mouseMoving = true

  // Nếu chuột ngừng di chuyển trong 300ms thì cho phép set timeout ẩn control
  mouseMoveTimeout = setTimeout(() => {
    mouseMoving = false

    controlsTimeout = setTimeout(() => {
      if (!mouseMoving) {
        controlsVisible.value = false
        showEpisodeList.value = false
        showQualityList.value = false
      }
    }, 3000)
  }, 300)
}

function initializeHlsVideo(source, videoElement) {
  console.log('Initializing HLS video with source:', source)
  if (!videoElement) return
  if (!source) {
    console.error('No video source provided')
    return
  }

  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(source)
    hls.attachMedia(videoElement)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (savedTime.value > 0 || props.currentTrack > 0) {
        videoElement.currentTime = savedTime.value || props.currentTrack
      }
      videoElement.play()
    })
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = source
    videoElement.currentTime = savedTime.value || props.currentTrack
    videoElement.play()
  }
}

function handleBackClick() {
  // Handle back navigation
  router.back()
}

function onWaiting() {
  isLoading.value = true
}

function onPlaying() {
  isLoading.value = false
}

function isQualityAvailable(key) {
  if (key === 'default') return true
  return movie.value?.video_qualities?.find((q) => q.quality === +key)
}

function getQualityByKey(key) {
  if (key === 'default') {
    return movie.value?.video_qualities?.at(-1) // hoặc logic mặc định
  }
  return movie.value?.video_qualities?.find((q) => q.quality === +key)
}

function onQualityClick(key) {
  const quality = getQualityByKey(key)
  if (!quality && key !== 'default') {
    emitter.emit('openUpgradeModal')
    return
  }
  // ngăn click nếu không có
  if (currentQuality.value?.quality === +key) {
    return
  } // ngăn click nếu đã chọn
  initializeHlsVideo(quality.video_url, videoRef.value)
  currentQuality.value = quality
}

const saveTime = useThrottleFn(async (time) => {
  const duration = videoRef.value?.duration
  const remaining = duration - time

  if (isMarkedFinished) return

  if (remaining <= 10) {
    console.log('Saving time as finished:', time, 'seconds remaining:', remaining)

    isMarkedFinished = true

    await apiServices.updateWatchHistory({
      target_id:
        movie.value?.type == CONTENT_TYPE.SERIES ? movie.value?.series?.id : movie.value?.id,
      target_type: movie.value?.type,
      season_id: movie.value.season?.id,
      episode_id: movie.value?.type == CONTENT_TYPE.SERIES ? movie.value.id : null,
      progress_seconds: 0,
      duration_seconds: duration,
      is_finished: 1,
    })

    localStorage.removeItem('video-current-time')

    return
  }

  // Cập nhật bình thường nếu chưa finished
  savedTime.value = Math.floor(time)

  await apiServices.updateWatchHistory({
    target_id: movie.value?.type == CONTENT_TYPE.SERIES ? movie.value?.series?.id : movie.value?.id,
    target_type: movie.value?.type,
    season_id: movie.value.season?.id,
    episode_id: movie.value?.type == CONTENT_TYPE.SERIES ? movie.value.id : null,
    progress_seconds: time,
    duration_seconds: duration,
    is_finished: 0,
  })
}, 5000)

const movie = computed(() => {
  return props.meta
})

const title = computed(() => {
  let title = ''
  if (props.meta?.type == CONTENT_TYPE.SERIES) {
    title = props.meta?.series?.title

    if (props.meta?.season) {
      title += ` - ${props.meta?.season?.title}`
    }

    title += ` - ${props.meta?.title}`
  } else if (props.meta?.type == CONTENT_TYPE.MOVIE) {
    title = props.meta?.title
  } else {
    title = 'Video'
  }
  return title
})

onMounted(() => {
  videoRef.value.addEventListener('pause', onPause)
  videoRef.value.addEventListener('play', onPlay)
  videoRef.value.addEventListener('playing', onPlaying)
  videoRef.value.addEventListener('progress', updateBuffered)
  videoRef.value.addEventListener('waiting', onWaiting)

  window.addEventListener('mousemove', showControlsTemporarily)
  emitter.on('changeEpisode', (episode) => {
    savedTime.value = 0
    router.push({
      name: 'Watch',
      params: {
        uuid: episode.uuid,
      },
      query: {
        type: movie.value?.series?.type,
      },
    })
  })
})

onBeforeUnmount(() => {
  console.log('hello')
  videoRef.value.removeEventListener('pause', onPause)
  videoRef.value.removeEventListener('play', onPlay)
  videoRef.value.removeEventListener('progress', updateBuffered)
  videoRef.value.removeEventListener('waiting', onWaiting)
  videoRef.value.removeEventListener('playing', onPlaying)

  window.removeEventListener('mousemove', showControlsTemporarily)
  clearTimeout(controlsTimeout)
  clearTimeout(mouseMoveTimeout)

  localStorage.removeItem('video-current-time')
  emitter.off('changeEpisode')
  emitter.emit('closeUpgradeModal')
})

onMounted(() => {
  console.log('Mounted VideoPlayer component')
})

watch(
  () => props.options,
  async (newVal) => {
    if (newVal && newVal.sources && newVal.sources.length > 0) {
      await nextTick()
      initializeHlsVideo(newVal.sources[0].src, videoRef.value)
      currentQuality.value = newVal.sources[0]
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
