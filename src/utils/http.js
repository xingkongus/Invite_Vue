import store from './store'
const API_HOST = 'http://invite.test/api/'

export default {
  request (method, url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: API_HOST + url,
        method: method,
        data: data,
        header: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': store.state.token
        },
        success: (res) => {
          if (res.header.Authorization) {
            store.dispatch('refreshToken', res.header.Authorization)
          }
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(new Error())
          }
        },
        fail: (error) => {
          reject(error)
        },
        complete: () => {}
      })
    })
  },
  post (url, data) {
    return this.request('POST', url, data)
  },
  get (url, data) {
    return this.request('GET', url, data)
  }
}
