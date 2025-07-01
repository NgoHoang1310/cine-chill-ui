<template>
  <header :class="[{ 'Header--bg': isScrolled }, 'Header']">
    <router-link :to="homeRoute">
      <NetflixLogo class="Header__logo" />
    </router-link>

    <div class="Header__actions">
      <ProfileDropdown v-if="auth?.user" />
      <router-link v-else class="btn btn--primary" :to="routes.signIn"> Sign in </router-link>
      <button
        :class="[{ 'hamburger--active': isMenuOpened }, 'hamburger', 'button']"
        v-on:click="toggleSidebar"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import ProfileDropdown from '@/components/ProfileDropdown/ProfileDropdown.vue'
import NetflixLogo from '@/assets/images/netflix.svg'
import debounce from '@/helpers/debounce'
import { useStore } from '@/store'
import { routes } from '@/helpers/constants'

const route = useRoute()
const router = useRouter()
const { auth } = useStore()

const search = ref('')
const isScrolled = ref(false)
const isMenuOpened = ref(false)
const homeRoute = routes.home

const path = computed(() => route.path)

watch(path, () => {
  isMenuOpened.value = false
})

watch(
  search,
  debounce((value) => {
    router.push(`${routes.search}/${value}`)
  }, 600),
)

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  isScrolled.value = currentScrollPosition > 30
}

const toggleSidebar = () => {
  isMenuOpened.value = !isMenuOpened.value
  document.documentElement.classList.toggle('no-scroll', isMenuOpened.value)
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
@import './Header.scss';
</style>
