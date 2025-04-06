<template>
  <div class="ProfileDropdown">
    <div class="ProfileDropdown__avatar" />
    <div class="ProfileDropdown__arrow">
      <font-awesome-icon :icon="['fas', 'sort-down']" />
    </div>
    <div class="dropdown">
      <div class="dropdown__list">
        <button class="btn dropdown__btn">Manage Profiles</button>
        <button class="btn dropdown__btn" v-on:click="handleLogOut">Sign out of Netflix</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useStore } from '@/store'
import { routes } from '@/helpers/constants'

const { auth } = useStore()
const isDropdownOpened: Ref<boolean> = ref(false)

const handleLogOut = async () => {
  await auth.logout()
  window.location.href = routes.signIn
}
</script>

<style lang="scss">
@import 'ProfileDropdown';
</style>
