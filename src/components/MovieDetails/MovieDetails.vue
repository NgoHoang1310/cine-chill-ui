<template>
  <div
    class="MovieDetails"
    :class="removeTransitonEffect ? 'before:!h-0' : ''"
    :style="{
      backgroundImage: getBackgroundImageUrl(movie.backdrop_url),
    }"
  >
    <div class="MovieDetails__fade--top" :style="removeTransitonEffect ? 'height: 0;' : ''" />
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{ movie.title }}
      </h1>
      <div class="MovieDetails__details">
        <p v-if="enableOverview" class="line-clamp-4 MovieDetails__description">
          {{ movie.description }}
        </p>
        <div class="flex">
          <button type="button" class="btn btn--play MovieDetails__btn" @click="addMovieToMyList">
            <font-awesome-icon :icon="['fas', 'play']" class="MovieDetails__btn-icon" fixed-width />
            Phát
          </button>
          <tippy
            class="flex items-center"
            content="Thêm vào danh sách của tôi"
            theme="light"
            placement="top"
            :arrow="true"
          >
            <button
              v-if="enableMyListButton"
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
          <button
            v-if="enableDetailButton"
            type="button"
            class="btn btn--blur MovieDetails__btn"
            @click="handleDetailClick"
          >
            <font-awesome-icon
              :icon="['fas', 'info-circle']"
              class="MovieDetails__btn-icon"
              fixed-width
            />
            Thông tin khác
          </button>
        </div>
      </div>
    </div>
    <div class="MovieDetails__fade--bottom" :style="removeTransitonEffect ? 'height: 0;' : ''" />
  </div>
</template>

<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import { useStore } from '@/store'
import useEmitter from '@/composables/useEmitter'

const props = defineProps<{
  movie: {
    id: number
    title: string
    description: string
    backdrop_url: string
  }
  enableOverview?: boolean
  enableMyListButton?: boolean
  enableDetailButton?: boolean
  removeTransitonEffect?: boolean
}>()

const store = useStore()
const emitter = useEmitter()

const getBackgroundImageUrl = (url: string) => {
  return `url(${url})`
}

const addMovieToMyList = () => {
  store.myList.addMovieToMyList({
    movie: props.movie,
  })
}

const handleDetailClick = () => {
  emitter.emit('openMovieModal', props.movie)
}
</script>

<style lang="scss">
@import 'MovieDetails';
</style>
