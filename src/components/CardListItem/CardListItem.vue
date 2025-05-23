<template>
  <div class="relative group cursor-pointer">
    <iframe
      class="w-full h-36 group-hover:brightness-75 transition duration-300"
      :src="normalizeYoutubeLink(content?.trailer_url)"
      title="YouTube video"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
  <p class="text-white text-center mt-2 text-md font-medium">{{ content?.title }}</p>
</template>

<script setup>
import { normalizeYoutubeLink } from '@/helpers/commons'

defineProps({
  content: {
    type: Object,
  },
})
</script>
