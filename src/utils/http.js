import store from './store'
import {utils, API_HOST} from './index'

// noinspection JSAnnotator
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
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaW52aXRlLnRlc3QvYXBpL2xvZ2luIiwiaWF0IjoxNTQyNzAwNjQzLCJleHAiOjE1NDI3MDA3MDMsIm5iZiI6MTU0MjcwMDY0MywianRpIjoidlIzSEJVSUJPeUJUWGhiMSIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.GNyXdA8JyBudzU5rs27F3oKfa67O8XZj2Lds8oX4Ijc'
        },
        success: (res) => {
          if (res.header.Authorization) {
            store.dispatch('refreshToken', res.header.Authorization)
          }
          if (res.statusCode === 200) {
            resolve(res.data)
          } else if (res.statusCode === 401) { // JWT授权过期或者失败 重新调用微信登录
            utils.wx_userinfo()
          } else {
            utils.toast('未知错误！')
            reject(new Error())
          }
        },
        fail: (error) => {
          reject(error)
        },
        complete: () => {
        }
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
