const API_HOST = 'https://invite.test/api/'
const header = {
  'Accept': 'application/json',
  'content-type': 'application/json'
}
export default {
  request (method, url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: API_HOST + url,
        method: method,
        data: data,
        header: header,
        success: (res) => {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res)
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
