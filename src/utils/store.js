import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    token: wx.getStorageSync('token')
  },
  mutations: {
    setUser (state, payload) {
      state.userInfo = payload.userInfo ? payload.userInfo : payload
      wx.setStorageSync('userInfo', state.userInfo)
    },
    refreshToken (state, token) {
      state.token = token
      wx.setStorageSync('token', token)
    }
  },
  actions: {
    setUser ({commit}, userInfo) {
      return new Promise(function (resolve, reject) {
        commit('setUser', userInfo)
      })
    },
    refreshToken ({commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
      })
    }
  }
})

export default store
