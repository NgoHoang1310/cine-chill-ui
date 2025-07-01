<template>
  <div class="page__content">
    <h1 class="page__title">Tìm kiếm</h1>
    <MovieList
      :initial-movie-list="movie"
      :empty-list-title="'Từ khóa &quot;' + search + '&quot; không có kết quả nào.'"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import MovieList from '@/components/MovieList/MovieList.vue'
import * as apiServices from '@/services'

// Lấy route
const route = useRoute()

// Khởi tạo reactive state
const movie = ref([])
const search = ref(route.params.search || '')

const fetchMovie = async (search) => {
  try {
    const response = await apiServices.getFilms({
      search: search,
      per_page: 10,
    })
    movie.value = response.result.data
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}
// Tự động cập nhật khi route param "search" thay đổi
watch(
  () => route.params.search,
  (newSearch) => {
    if (newSearch !== null && newSearch !== undefined) {
      search.value = newSearch
      fetchMovie(newSearch)
    }
  },
)
</script>
