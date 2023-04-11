import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Store
import { createPinia } from 'pinia'
import { initStore } from './stores'

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')

initStore()
