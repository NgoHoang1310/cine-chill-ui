<template>
  <div class="MovieLabels">
    <span :class="['MovieLabels__rate']">
      T16
      <!-- {{ movie.age.key }} -->
    </span>
    <span class="MovieLabels__date">
      <!-- {{ movieReleaseDate }} -->
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
