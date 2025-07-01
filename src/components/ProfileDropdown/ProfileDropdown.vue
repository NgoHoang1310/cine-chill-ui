<template>
  <div class="ProfileDropdown">
    <img :src="auth.user.photoURL" class="ProfileDropdown__avatar" />
    <div class="ProfileDropdown__arrow">
      <font-awesome-icon :icon="['fas', 'sort-down']" />
    </div>
    <div class="dropdown">
      <div class="dropdown__list">
        <router-link to="/profile" class="btn dropdown__btn">Quản lí hồ sơ</router-link>
        <router-link to="/plans" class="btn dropdown__btn">Gói cước</router-link>
        <button class="btn dropdown__btn" v-on:click="handleLogOut">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { routes } from '@/helpers/constants'

const { auth } = useStore()

const handleLogOut = async () => {
  await auth.logout()
  window.location.href = routes.signIn
}
</script>

<style lang="scss">
@import 'ProfileDropdown';
</style>
