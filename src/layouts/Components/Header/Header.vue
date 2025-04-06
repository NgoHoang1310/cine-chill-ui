<script setup lang="ts">
import AuthorizedHeader from './AuthorizedHeader.vue'
import { useStore } from '@/store'

const { auth } = useStore()
console.log('auth', auth.user)
</script>

<template>
  <div v-if="auth.user">
    <AuthorizedHeader />
  </div>
</template>
