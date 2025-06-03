<template>
  <div class="flex items-center gap-4">
    <div
      class="relative flex w-full h-1 bg-neutral-600 cursor-pointer group"
      @click="seekTo($event)"
      @mousemove="handleMouseMove"
      @mouseleave="showTooltip = false"
    >
      <!-- Buffered Bar -->
      <div
        v-if="!readOnly"
        class="absolute h-full bg-neutral-400"
        :style="{ width: bufferedPercent + '%' }"
      />

      <!-- Played Bar -->
      <div class="absolute h-full bg-red-600" :style="{ width: playedPercent + '%' }" />

      <!-- Thumb -->
      <div
        v-if="!readOnly"
        class="absolute -top-1 w-3 h-3 rounded-full bg-red-600 transition-opacity duration-200"
        :style="{ left: `calc(${playedPercent}% - 6px)` }"
      />

      <!-- Tooltip time -->
      <div
        v-if="showTooltip && !readOnly"
        class="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded shadow"
        :style="{ left: tooltipX + 'px' }"
      >
        {{ formatTime(hoveredTime) }}
      </div>
    </div>
    <span v-if="!readOnly" class="text-nowrap">{{ formatTime(duration - currentTime) }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTime: Number,
  duration: Number,
  buffered: Number,
  videoElement: Object,
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['seek'])

const playedPercent = computed(() =>
  props.duration ? (props.currentTime / props.duration) * 100 : 0,
)

const bufferedPercent = computed(() =>
  props.duration ? (props.buffered / props.duration) * 100 : 0,
)

function seekTo(e) {
  if (props.readOnly) return
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const newTime = percent * props.duration
  emit('seek', newTime)
}

function formatTime(t) {
  const hours = Math.floor(t / 3600)
  const minutes = Math.floor((t % 3600) / 60)
  const seconds = Math.floor(t % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
}

// Tooltip
const tooltipX = ref(0)
const hoveredTime = ref(0)
const showTooltip = ref(false)

function handleMouseMove(e) {
  if (!props.duration) return
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  hoveredTime.value = percent * props.duration
  tooltipX.value = e.clientX - rect.left
  showTooltip.value = true
}
</script>
