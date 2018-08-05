import http from '@/utils/http'
export default {
  wx_login () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log(res.code)
            resolve(res.code)
          }
        }
      })
    })
  },
  wx_userinfo (iv, encryptedData) {
    return new Promise((resolve, reject) => {
      this
        .get_code()
        .then((res) => {
          http
            .post('login', {
              code: res,
              iv: iv,
              encryptedData: encryptedData
            })
            .then(res => {
              if (res) {
                console.log(res)
              }
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  get_code () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code)
          }
        }
      })
    })
  }
}
