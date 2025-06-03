<template>
  <div class="MovieLabels">
    <span
      :class="[
        'MovieLabels__rate',
        'px-1 py-0.5 border border-solid border-gray-500 rounded text-xs',
      ]"
    >
      {{ movie.age.key }}
    </span>
    <span class="MovieLabels__date">
      {{ movie.release }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MovieLabels',
  props: {
    movie: {
      age: String,
      season: String,
      episode: String,
    },
  },
}
</script>

<style lang="scss">
@import 'MovieLabels';
</style>
