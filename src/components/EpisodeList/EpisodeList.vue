<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold text-white">Tập</h3>
      <select
        v-if="seasons.length > 0"
        class="bg-black border border-gray-500 text-white text-sm px-3 py-1 rounded"
        @change="handleSeasonChange($event.target.value)"
      >
        <option v-for="(season, index) in seasons" :key="index" :value="season?.id">
          {{ season?.title }}
        </option>
      </select>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-sm font-medium text-white">
        <span>{{ currentSeason?.title }}</span>
      </div>
    </div>

    <!-- Danh sách tập -->
    <div v-if="episodes.length > 0">
      <EpisodeListItem
        :active="episode?.id == currentEpisode?.id"
        v-for="(episode, index) in episodes"
        :key="index"
        :episode="episode"
      />
    </div>
    <p v-else class="text-white text-center text-md font-medium py-4">Chưa có tập phim nào</p>
  </div>
</template>

<script setup>
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem.vue'
import * as apiServices from '@/services'

const props = defineProps({
  series: {
    type: Object,
    required: true,
  },
  seasons: {
    type: Array,
    default: () => [],
  },
  currentSeason: {
    type: Object,
    default: null,
  },
  currentEpisode: {
    type: Object,
    default: null,
  },
})

const episodes = ref([])
const currentSeason = ref(props.currentSeason || props.seasons[0]?.id || null)
const currentEpisode = ref(props.currentEpisode || null)

const fetchEpisodes = async () => {
  try {
    let response = null
    if (currentSeason.value) {
      response = await apiServices.getEpisodesBySeasons(props.series.id, currentSeason.value)
    } else {
      response = await apiServices.getEpisodesBySeries(props.series.id)
    }

    episodes.value = response.result.data
  } catch (error) {
    console.error('Error fetching episodes:', error)
  }
}

const handleSeasonChange = (season) => {
  if (!season) return
  currentSeason.value = season
  fetchEpisodes()
}

onMounted(() => {
  console.log(props.currentEpisode)
  fetchEpisodes()
})
</script>
