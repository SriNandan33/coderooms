import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      // eslint-disable-next-line standard/computed-property-even-spacing
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post(`${process.env.VUE_APP_API_BASE_URL}auth/register`, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, credentials) {
      return axios
        .post(`${process.env.VUE_APP_API_BASE_URL}auth/login`, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    showSuccessToast({ commit }, message) {
      this._vm.$toast.open({
        message: message,
        type: 'success'
      })
    },
    showErrorToast({ commit }, message) {
      this._vm.$toast.open({
        message: message,
        type: 'error'
      })
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    },
    currentUser(state) {
      return state.user
    }
  }
})
