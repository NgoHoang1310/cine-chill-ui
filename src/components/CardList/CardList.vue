<template>
  <div v-if="contents.length > 0" class="text-white">
    <h2 class="text-2xl font-bold mb-6">Trailer & Nội dung khác</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(content, index) in contents" :key="index">
        <CardListItem :content="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardListItem from '../CardListItem/CardListItem.vue'
defineProps({
  contents: {
    type: Array,
    default: () => [],
  },
})
</script>
