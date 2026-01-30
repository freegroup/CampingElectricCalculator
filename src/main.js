import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/colors.less'
import messages from "@/i18n.js"
import { toFixed } from "@/utils/Wire.js"

Vue.config.productionTip = true
Vue.use(VueI18n)

// Check for saved language preference, otherwise use browser language
const savedLanguage = localStorage.getItem('userLanguage')
const userLang = navigator.language || navigator.userLanguage
const locale = savedLanguage || (userLang.startsWith('de') ? 'de' : 'en')

// Save detected language if not already saved
if (!savedLanguage) {
  localStorage.setItem('userLanguage', locale)
}

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
  messages
})

Vue.filter('toFixed', toFixed)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
