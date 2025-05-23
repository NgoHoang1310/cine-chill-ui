import '@/assets/styles/tailwind.css'
import '@/assets/styles/style.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/helpers/fontawesome'

import App from './App.vue'
import mitt from 'mitt'
import router from './router'

const app = createApp(App)
app.config.globalProperties.emitter = mitt()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
