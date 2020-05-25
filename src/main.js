import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from './http'

import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Loading, {
  loader: 'bars',
  color: '#fff',
  backgroundColor: '#001528'
})

new Vue({
  router,
  store,
  created() {
    var loader = null
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }

    this.$http.interceptors.request.use(config => {
      loader = this.$loading.show()
      return config
    })
    this.$http.interceptors.response.use(
      response => {
        loader.hide()
        return response
      },
      error => {
        this.$loading.hide()
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
