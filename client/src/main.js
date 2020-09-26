import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { createProvider } from './vue-apollo'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  router,
  render: h => h(App)
}).$mount('#app')
