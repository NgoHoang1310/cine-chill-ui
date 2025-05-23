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
      <div class="flex">
        <button type="button" class="btn btn--play MovieSliderItem__btn" @click="addMovieToMyList">
          <font-awesome-icon
            :icon="['fas', 'play']"
            class="MovieSliderItem__btn-icon"
            fixed-width
          />
        </button>
        <tippy content="Thêm vào danh sách của tôi" theme="light" placement="top" :arrow="true">
          <button
            type="button"
            class="btn btn--blur MovieSliderItem__btn"
            @click="addMovieToMyList"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
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
          @click="handleDetailClick"
        >
          <button
            type="button"
            class="btn btn--blur MovieSliderItem__btn"
            @click="addMovieToMyList"
          >
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
import useEmitter from '@/composables/useEmitter'

const props = defineProps({
  movie: {
    name: String,
    title: String,
    backdrop_url: String,
  },
})
const emitter = useEmitter()

const getBackgroundImageUrl = (url) => {
  return `url(${url})`
}

const handleDetailClick = () => {
  emitter.emit('openMovieModal', props.movie)
}
</script>

<style lang="scss">
@import 'MovieSliderItem';
</style>
