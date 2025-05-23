<script setup lang="ts">
import background from '@/assets/images/background/website.jpg'
import Spinner from '@/components/Spinner/Spinner.vue'
import { routes } from '@/helpers/constants'
import router from '@/router'
import { toast } from 'vue3-toastify'

const { auth, shared } = useStore()

// Khai báo các state cần thiết
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const signUpRoute = routes.signUp
const loading = computed(() => auth.loading)

// Các phương thức

const handleSignInWithEmailAndPassword = async () => {
  await auth.loginWithEmailAndPassword(email.value, password.value)
}

const handleSignInWithGoogle = async () => {
  await auth.loginWithGoogle()
}

watch(auth, async (newVal) => {
  if (newVal.user) {
    toast.success('Đăng nhập thành công')
    setTimeout(() => {
      router.push(routes.home)
    }, 2000)
  }
})

watch(shared, (newVal) => {
  switch (newVal.error) {
    case 'auth/email-already-in-use':
      toast.error('Email đã được xử dụng. Vui lòng thử lại.')
      break
    case 'auth/invalid-credential':
      toast.error('Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
      break
    default:
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.')
  }
})

onUnmounted(() => {})
</script>

<template>
  <div class="SignIn">
    <div :style="{ background: `url(${background})` }" class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">Sign In</h1>
        <form @submit.prevent="handleSignInWithEmailAndPassword" class="form">
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
          <div class="form__btns">
            <button type="submit" class="btn btn--primary" :disabled="loading">Sign In</button>
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
          New to cinechill?
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
