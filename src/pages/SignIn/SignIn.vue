<script setup lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { routes } from '@/helpers/constants'
import { ref, onUnmounted, computed, onMounted, watch, nextTick } from 'vue'
import { useStore } from '@/store'

const { auth } = useStore()

// Khai báo các state cần thiết
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const signUpRoute = routes.signUp

// Computed properties
// const user = computed(() => store.user)

const loading = computed(() => auth.loading)

// const error = computed(() => {
//   let template = ''
//   if (!store.error) return null
//   switch (store.error.code) {
//     case 'auth/user-not-found':
//       template =
//         "<div>Sorry, we can\'t find an account with this email address. Please try again or " +
//         "<router-link to='/sign-up'>create a new account.</router-link></div>"
//       break
//     case 'auth/wrong-password':
//       template =
//         '<div><b>Incorrect password.</b> Please try again or you can ' +
//         "<router-link to='/recover-password'>reset your password.</router-link></div>"
//       break
//     default:
//       template = ''
//   }
//   return { template }
// })

// Các phương thức

const handleSignIn = () => {
  console.log('sign in')

  // auth.signIn(email.value, password.value, rememberMe.value)
}

const handleSignInWithGoogle = async () => {
  await auth.loginWithGoogle()
  window.location.href = routes.home
}

onUnmounted(() => {})
</script>

<template>
  <div class="SignIn">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">Sign In</h1>
        <!-- <transition name="fade-height">
          <div v-bind="error" v-if="error" class="form__error-message" />
        </transition> -->
        <form @submit.prevent="" class="form">
          <div class="form__field">
            <div class="input__wrapper">
              <input
                id="email"
                type="email"
                required
                placeholder="Email"
                v-model="email"
                :class="[{ 'input--filled': email }, 'input']"
              />
              <label class="input__placeholder" for="email"> Email </label>
            </div>
          </div>
          <div class="form__field">
            <div class="input__wrapper">
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                v-model="password"
                :class="[{ 'input--filled': password }, 'input']"
              />
              <label class="input__placeholder" for="password"> Password </label>
            </div>
          </div>
          <div class="flex-jc">
            <div class="checkbox__wrapper">
              <input
                id="rememberMeCheckbox"
                type="checkbox"
                class="checkbox__input"
                v-model="rememberMe"
              />
              <label for="rememberMeCheckbox" class="checkbox">
                <span>
                  <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <span class="checkbox__text"> Remember me </span>
              </label>
            </div>
            <a href="https://www.netflix.com/LoginHelp" class="link link--s"> Need help ? </a>
          </div>
        </form>
        <ul class="SignIn__social-list">
          <li class="SignIn_social-item">
            <button
              class="btn SignIn__social-btn"
              :disabled="loading"
              @click.prevent="handleSignInWithGoogle"
            >
              <i class="SignIn__social-icon">
                <font-awesome-icon :icon="['fab', 'google']" />
              </i>
              Login with Google
            </button>
          </li>
          <li class="SignIn_social-item">
            <button
              class="btn SignIn__social-btn"
              :disabled="loading"
              @click.prevent="handleSignInWithGoogle"
            >
              <i class="SignIn__social-icon">
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </i>
              Login with Facebook
            </button>
          </li>
        </ul>
        <p>
          New to netflix?
          <router-link class="link link--white" :to="signUpRoute">Sign up now.</router-link>
        </p>
        <div class="Spinner__overflow" v-if="loading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'SignIn';
</style>
