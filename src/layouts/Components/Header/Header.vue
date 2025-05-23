<script setup lang="ts">
import AuthorizedHeader from './AuthorizedHeader.vue'
import UnauthorizedHeader from './UnauthorizedHeader.vue'
import { useStore } from '@/store'

const { auth } = useStore()
</script>

<template>
  <div v-if="auth.user">
    <AuthorizedHeader />
  </div>
  <div v-else>
    <UnauthorizedHeader />
  </div>
</template>
