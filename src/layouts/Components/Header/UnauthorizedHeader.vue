<template>
  <header class="Header--un">
    <NetflixLogo class="Header__logo Header__logo--un" />
    <div class="Header__actions">
      <router-link v-if="route.path != routes.signIn" class="btn btn--primary" :to="routes.signIn">
        Sign in
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import NetflixLogo from '@/assets/images/netflix.svg'
import { routes } from '@/helpers/constants'

const route = useRoute()
</script>

<style lang="scss">
@import './Header.scss';
</style>
