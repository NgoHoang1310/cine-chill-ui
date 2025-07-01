<script setup lang="ts">
import Header from '@/layouts/Components/Header/Header.vue'
import Footer from '@/layouts/Components/Footer/Footer.vue'
import MovieModal from '@/components/Modal/MovieModal.vue'
import PlanConfirmModal from '@/components/Modal/PlanConfirmModal.vue'
</script>

<template>
  <Header />
  <main>
    <router-view />
    <MovieModal />
    <PlanConfirmModal />
  </main>
  <Footer />
</template>
