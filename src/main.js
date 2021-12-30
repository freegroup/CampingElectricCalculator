import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
