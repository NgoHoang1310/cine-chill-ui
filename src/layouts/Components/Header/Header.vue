<script setup lang="ts">
import AuthorizedHeader from './AuthorizedHeader.vue'
import UnauthorizedHeader from './UnauthorizedHeader.vue'
import BasicHeader from './BasicHeader.vue'
import { useStore } from '@/store'

const { auth } = useStore()
const route = useRoute()
</script>

<template>
  <div v-if="route.name === 'Plan' || route.name === 'PaymentResult'">
    <BasicHeader />
  </div>
  <div v-else-if="auth.user">
    <AuthorizedHeader />
  </div>
  <div v-else>
    <UnauthorizedHeader />
  </div>
</template>
