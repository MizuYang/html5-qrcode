import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

import App from './App.vue'

import VConsole from 'vconsole'

const pinia = createPinia()
const app = createApp(App)
const vConsole = new VConsole({ theme: 'dark' })
console.log(vConsole)

app.use(router)
app.use(pinia)

app.mount('#app')
