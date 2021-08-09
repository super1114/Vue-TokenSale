import Vue from 'vue'
import router from './router'
import { store } from './store'
import App from './App.vue'
import './assets/tailwind.css'

import VueQRCodeComponent from 'vue-qrcode-component'

Vue.config.productionTip = false
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  render: h => h(App),
  store,
  router,
  components: { App }
}).$mount('#app')
