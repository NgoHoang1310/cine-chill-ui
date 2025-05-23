<script setup lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import background from '@/assets/images/background/website.jpg'

import { toast } from 'vue3-toastify'
import { routes } from '@/helpers/constants'

const router = useRouter()
const { auth, shared } = useStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = computed(() => auth.loading)
const errors = ref<{
  password: string[]
  confirmPassword: string[]
}>({
  password: [],
  confirmPassword: [],
})

const isFormValid = () => {
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword.push('Passwords do not match.')
  }
  if (password.value.length < 6) {
    errors.value.password.push('Password should be at least 6 characters.')
  }
  if (
    password.value === password.value.toLowerCase() ||
    password.value === password.value.toUpperCase()
  ) {
    errors.value.password.push('Contains at least one uppercase and lowercase characters.')
  }
  if (!isLatin(password.value)) {
    errors.value.password.push('Latin characters and numbers only.')
  }
  return Object.values(errors.value).every((field) => field.length === 0)
}

const isLatin = (password: string) => {
  const ifLatin = /^[a-zA-z0-9_]+$/g
  return ifLatin.test(password)
}

const handleSignUpWithEmailAndPassword = async (email: string, password: string) => {
  if (!isFormValid()) return null
  await auth.registerWithEmailAndPassword(email, password)
}

watch(shared, (newVal) => {
  switch (newVal.error) {
    case 'auth/email-already-in-use':
      toast.error('Email đã được xử dụng. Vui lòng thử lại.')
      break
    default:
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.')
  }
})

watch(auth, async (newVal) => {
  if (newVal.user) {
    toast.success('Đăng kí thành công')
    setTimeout(() => {
      router.push(routes.home)
    }, 2000)
  }
})
</script>

<template>
  <div class="SignUp">
    <div :style="{ background: `url(${background})` }" class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">Sign Up</h1>
        <form
          @submit.prevent="() => handleSignUpWithEmailAndPassword(email, password)"
          class="form"
        >
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
            <div :class="[{ 'input--error': errors.password.length !== 0 }, 'input__wrapper']">
              <input
                id="password"
                type="password"
                required
                placeholder="password"
                v-model="password"
                :class="[{ 'input--filled': password }, 'input']"
              />
              <label class="input__placeholder" for="password"> Password </label>
            </div>
            <ul class="form__error-list">
              <li :key="index" class="form__error-item" v-for="(error, index) in errors.password">
                {{ error }}
              </li>
            </ul>
            <ul class="form__required-list">
              <li
                :class="[
                  { 'form__required-item--done': password.length >= 6 },
                  'form__required-item',
                ]"
              >
                <span class="form__required-text"> At least 6 characters long </span>
              </li>
              <li
                :class="[
                  { 'form__required-item--done': password !== password.toLowerCase() },
                  'form__required-item',
                ]"
              >
                <span class="form__required-text"> One uppercase character </span>
              </li>
              <li
                :class="[
                  { 'form__required-item--done': password !== password.toUpperCase() },
                  'form__required-item',
                ]"
              >
                <span class="form__required-text"> One lowercase character </span>
              </li>
              <li
                :class="[{ 'form__required-item--done': isLatin(password) }, 'form__required-item']"
              >
                <span class="form__required-text"> Latin characters only </span>
              </li>
            </ul>
          </div>
          <div class="form__field">
            <div :class="[{ 'input--error': errors.password.length !== 0 }, 'input__wrapper']">
              <input
                id="confirm-password"
                type="password"
                required
                placeholder="Confirm Password"
                v-model="confirmPassword"
                :class="[{ 'input--filled': confirmPassword }, 'input']"
              />
              <label class="input__placeholder" for="confirm-password"> Confirm Password </label>
            </div>
            <ul class="form__error-list">
              <li
                :key="index"
                class="form__error-item"
                v-for="(error, index) in errors.confirmPassword"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="form__btns">
            <button type="submit" class="btn btn--primary" :disabled="loading">Sign Up</button>
          </div>
        </form>
        <div class="Spinner__overflow" v-if="loading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
</template>
