<template>
  <div class="mylist">
    <div class="mylist__slider-list mt-28">
      <h3 class="text-3xl font-bold mb-6 ml-7">Danh sách của tôi</h3>
      <MovieList :initial-movie-list="myList.myListGetter" empty-list-title="Không có dữ liêu" />
    </div>
  </div>
</template>

<script setup>
import MovieList from '../../components/MovieList/MovieList.vue'

const { myList } = useStore()

onMounted(async () => {
  myList.fetchMyList()
})
</script>
