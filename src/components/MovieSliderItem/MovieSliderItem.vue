<template>
  <div
    class="MovieSliderItem"
    :style="{
      backgroundImage: getBackgroundImageUrl(movie.backdrop_url),
    }"
  >
    <div class="MovieSliderItem__details">
      <h3 class="MovieSliderItem__title">
        {{ movie.title || movie.name }}
      </h3>
      <ProgressBar
        v-if="movie?.watch_history?.progress_seconds"
        class="mb-2"
        :currentTime="movie?.watch_history?.progress_seconds"
        :duration="movie?.watch_history?.duration_seconds"
        :read-only="true"
      />
      <div class="flex">
        <button type="button" class="btn btn--play MovieSliderItem__btn" @click="play(movie)">
          <font-awesome-icon
            :icon="['fas', 'play']"
            class="MovieSliderItem__btn-icon"
            fixed-width
          />
        </button>
        <tippy
          :content="
            !myList.isInMyList(movie) ? 'Thêm vào danh sách của tôi' : 'Xóa khỏi danh sách của tôi'
          "
          theme="light"
          placement="top"
          :arrow="true"
        >
          <button
            v-if="!myList.isInMyList(movie)"
            type="button"
            class="btn btn--blur MovieSliderItem__btn"
            @click="myList.addToMyList(movie)"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
          </button>
          <button
            v-else
            type="button"
            class="btn btn--blur MovieSliderItem__btn"
            @click="myList.removeFromMyList(movie)"
          >
            <font-awesome-icon
              :icon="['fas', 'minus']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
          </button>
        </tippy>
        <tippy
          content="Thông tin"
          theme="light"
          placement="top"
          class="ml-auto"
          :arrow="true"
          @click="show(movie)"
        >
          <button type="button" class="btn btn--blur MovieSliderItem__btn">
            <font-awesome-icon
              :icon="['fas', 'info-circle']"
              class="MovieSliderItem__btn-icon"
              fixed-width
            />
          </button>
        </tippy>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Tippy } from 'vue-tippy'
import useMovie from '@/composables/useMovie'
import ProgressBar from '../ProgressBar/ProgressBar.vue'

defineProps({
  movie: {
    name: String,
    title: String,
    backdrop_url: String,
  },
})
const { play, show } = useMovie()
const { myList } = useStore()

const getBackgroundImageUrl = (url) => {
  return `url(${url})`
}
</script>

<style lang="scss">
@import 'MovieSliderItem';
</style>
