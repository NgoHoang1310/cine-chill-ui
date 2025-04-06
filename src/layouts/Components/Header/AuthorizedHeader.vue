<template>
  <header :class="[{ 'Header--bg': isScrolled }, 'Header']">
    <router-link :to="homeRoute">
      <!-- <NetflixLogo class="Header__logo" /> -->
    </router-link>

    <nav :class="[{ 'Header__nav--opened': isMenuOpened }, 'Header__nav']">
      <ul class="Header__nav-list">
        <li class="Header__nav-item" v-for="(navItem, index) in navList" :key="index">
          <router-link v-if="!navItem.nav" class="Header__nav-link" :to="navItem.link">
            {{ navItem.title }}
          </router-link>
          <div v-else class="Header__nav-link">
            {{ navItem.title }}
            <div class="dropdown">
              <div class="dropdown__list" v-for="(dropdownItem, index) in navItem.nav" :key="index">
                <router-link class="dropdown__btn" :to="`${navItem.link}/${dropdownItem.id}`">
                  {{ dropdownItem.name }}
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div class="Header__search" :class="[{ 'Header__search--active': search }, 'Header__search']">
      <label class="flex-jc">
        <font-awesome-icon :icon="['fas', 'search']" class="Header__search-icon" />
        <input
          name="search"
          type="text"
          placeholder="Titles, characters, geners"
          v-model="search"
          class="Header__search-input"
        />
      </label>
    </div>

    <div class="Header__actions">
      <ProfileDropdown />
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
import { routes, actions } from '@/helpers/constants'

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

const route = useRoute()
const router = useRouter()
const store = useStore()

const search = ref('')
const isScrolled = ref(false)
const isMenuOpened = ref(false)
const homeRoute = routes.home

const navList = ref([
  { title: 'Home', link: routes.home },
  { title: 'TV Shows', link: routes.tvShows, nav: [] },
  { title: 'Movies', link: routes.movies, nav: [] },
  { title: 'New & Popular', link: routes.popular },
  { title: 'My List', link: routes.myList },
])

const path = computed(() => route.path)
const genres = computed(() => store.shared.genres)

watch(path, () => {
  isMenuOpened.value = false
})

watch(genres, (value) => {
  if (value) {
    navList.value = navList.value.map((item) => {
      if (item.title === 'TV Shows') return { ...item, nav: value.tv }
      if (item.title === 'Movies') return { ...item, nav: value.movies }
      return item
    })
  }
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (route.params.search) {
    search.value = route.params.search
  }
  store.shared.setGenres()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
@import './Header.scss';
</style>
