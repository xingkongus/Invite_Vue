import http from '@/utils/http'
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
  // 用户详细信息(反馈后端解密)
  wx_userinfo (iv, encryptedData) {
    return new Promise((resolve, reject) => {
      // 判断是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) { // 已经授权才发送请求
            this.showLoading('登录中...') // 网络延迟提示信息
            this.wx_login()
              .then((res) => {
                http
                  .post('login', {
                    code: res,
                    iv: iv,
                    encryptedData: encryptedData
                  })
                  .then(res => {
                    wx.setStorageSync('userInfo', res.userinfo)
                    wx.setStorageSync('token', res.token)
                    resolve(res)
                    this.hideLoading() // 隐藏提示信息
                    this.toast('登录成功')
                  })
                  .catch(error => {
                    this.hideLoading() // 隐藏提示信息
                    this.toast('登录失败')
                    reject(error)
                  })
              })
              .catch(error => {
                reject(error)
              })
          }
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
  }

}
