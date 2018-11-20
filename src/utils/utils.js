import http from '@/utils/http'
import store from './store'

export default {
  // 微信登录 获取code
  wx_login () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code)
          }
        }
      })
    })
  },
  // 调用微信获取用户信息接口，需要button授权
  getuserInfo () {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) { // 已经授权
            wx.getUserInfo({
              withCredentials: true,
              success: res => resolve(res),
              fail: err => reject(err)
            })
          }
        }
      })
    })
  },
  // 用户详细信息(反馈后端解密)
  wx_userinfo () {
    return new Promise((resolve, reject) => {
      let code = null
      return this.wx_login().then(res => {
        code = res
        return this.getuserInfo()
      }).then(userInfo => {
        this.showLoading('登录中...') // 网络延迟提示信息
        http
          .post('login', {
            code: code,
            iv: userInfo.iv,
            encryptedData: userInfo.encryptedData
          })
          .then(result => {
            store.dispatch('setUser', result.userinfo)
            store.dispatch('refreshToken', result.token)
            resolve(result.userinfo)
            this.hideLoading() // 隐藏提示信息
            this.toast('登录成功')
          })
          .catch(error => {
            this.hideLoading() // 隐藏提示信息
            this.toast('登录失败')
            reject(error)
          })
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 检查登录态是否过期
  checkSession () {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: res => { // session_key 未过期，并且在本生命周期一直有效
          resolve(true)
        },
        fail: error => { // session_key 已经失效，需要重新执行登录流程
          reject(error)
        }
      })
    })
  },
  // 封装toast方法
  toast (title = '提示', icon = 'success', duration = 1000, mask = true) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: title,
        icon: icon,
        duration: duration,
        mask: mask,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  },
  // 封装showModal方法
  showModal (title = 'error', content = '留言不能为空~~~~') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: content,
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          resolve(res)
        },
        error: err => reject(err)
      })
    })
  },
  // 封装loading状态方法
  showLoading (title = '加载中', mask = true) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: title,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  },
  // 封装隐藏loading状态方法
  hideLoading () {
    wx.hideLoading()
  },
  // 导航栏loading
  showNavBarLoad () {
    wx.showNavigationBarLoading()
  },
  // 导航栏loading
  hideNavBarLoad () {
    wx.hideNavigationBarLoading()
  }

}
