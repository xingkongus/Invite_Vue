import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    token: wx.getStorageSync('token')
  },
  mutations: {
    setUser: (state, payload) => {
      state.userInfo = payload.userInfo
    },
    refreshToken (state, token) {
      state.token = token
      wx.setStorageSync('token', token)
    }
  },
  actions: {
    refreshToken ({commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
      })
    }
  }
})

export default store
