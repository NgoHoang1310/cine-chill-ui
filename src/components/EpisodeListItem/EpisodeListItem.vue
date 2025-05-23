<template>
  <div class="space-y-4 py-1">
    <div class="flex gap-4 p-4 bg-[#1e1e1e] rounded-lg">
      <div class="text-gray-400 text-xl font-bold w-6 text-center pt-1">
        {{ episode?.episode_number }}
      </div>
      <div class="relative w-40 h-24">
        <img src="https://via.placeholder.com/160x90" class="rounded object-cover w-full h-full" />
        <div class="absolute inset-0 flex items-center justify-center">
          <button type="button" class="btn btn--play MovieSliderItem__btn">
            <font-awesome-icon
              :icon="['fas', 'play']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
          </button>
        </div>
      </div>
      <div class="flex-1 space-y-1">
        <div class="flex justify-between items-center">
          <h4 class="font-semibold text-white">{{ episode?.title }}</h4>
          <span class="text-sm text-gray-400">{{ convertMinutesToHours(episode?.duration) }}</span>
        </div>
        <p class="text-sm text-gray-400">
          {{ episode?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertMinutesToHours } from '@/helpers/commons'

defineProps({
  episode: {
    type: Object,
    required: true,
  },
})
</script>
