import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout.vue'
import SignIn from '@/pages/SignIn/SignIn.vue'
import SignUp from '@/pages/SignUp/SignUp.vue'
import Home from '@/pages/Home/Home.vue'
import Movies from '@/pages/Movies/Movies.vue'
import TVShows from '@/pages/TVShows/TVShows.vue'
import Popular from '@/pages/Popular/Popular.vue'
import MyList from '@/pages/MyList/MyList.vue'
import Search from '@/pages/Search/Search.vue'
import NotFound from '@/pages/Error/NotFound.vue'
import { routes } from '../helpers/constants'
import { useStore } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:pathMatch(.*)*', redirect: '/404' },
    { path: '/404', name: 'NotFound', component: NotFound },
    {
      path: '/',
      component: DefaultLayout, // Dùng DefaultLayout cho tất cả
      children: [
        { path: routes.signIn, name: 'SignIn', component: SignIn, meta: { guestOnly: true } },
        { path: routes.signUp, name: 'SignUp', component: SignUp, meta: { guestOnly: true } },
        { path: routes.home, name: 'Home', component: Home, meta: { requiresAuth: true } },
        {
          path: `${routes.movies}`,
          name: 'Movies',
          component: Movies,
          meta: { requiresAuth: true },
        },
        {
          path: `${routes.series}`,
          name: 'Series',
          component: TVShows,
          meta: { requiresAuth: true },
        },
        { path: routes.popular, name: 'Popular', component: Popular, meta: { requiresAuth: true } },
        { path: routes.myList, name: 'MyList', component: MyList, meta: { requiresAuth: true } },
        {
          path: `${routes.search}/:search`,
          name: 'Search',
          component: Search,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { auth } = useStore()
  if (auth.loading) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => auth.loading,
        (val) => {
          if (!val) {
            unwatch()
            resolve(true)
          }
        },
      )
    })
  }

  if (to.meta.requiresAuth && !auth.user) {
    return next(routes.signIn)
  }

  // Nếu route dành cho khách mà đã đăng nhập → redirect về /
  if (to.meta.guestOnly && auth.user) {
    return next(routes.home)
  }

  // Cho phép đi tiếp nếu không bị chặn
  return next()
})

export default router
