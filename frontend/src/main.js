import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCookies from 'vue3-cookies'

createApp(App)
  .use(VueCookies)
  .use(store)
  .use(router)
  .mount('#app')
