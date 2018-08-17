//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inviteID: "",   //邀请函ID
    message: [],   //评论
    nickName: "",
    avatarUrl: "",
    userInfo: {
      avatarUrl: "/images/avatar-default.png",
      nickName: "我",
    },   //用户个人信息
    siteImg: "/images/administrate.png" ,      //邀请函的图片
    IsuserInfo: false,          //是否本地有存在用户个人信息
    messageValue: "",         //留言临时保存
    peoplenum: 0,     //邀请参加的总人数
    invitewords: "大家好，我是xxx,明天我要在行政楼在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~", // 邀请函的内容
    acceptAvators: []   //邀请参加的头像
  },

  //第一次加载
  onLoad: function (options) {

    //得到场景值
    var scene = decodeURIComponent(options.scene)
    // console.log(scene)
    var that = this

    //是否有在本地存用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data,
          IsuserInfo: true
        })
      },
    })

    //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.url + "/BackInfo",
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        openid: scene
      },
      success: function(res) {

        //如果存在该用户
        if (res.data.status == 200 ){

          that.setData({

            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl,
            inviteID: res.data.inviteID,  //该邀请函ID
            siteImg: res.data.siteImg,   //选择的图片
            invitewords: res.data.invitewords,    //邀请函内容
            acceptAvators: res.data.acceptedAvators,   //邀请者的头像
            message: res.data.message,       //留言
            peoplenum: res.data.acceptedAvatorsnum     //参加者总数

          })

          //一行中不足4个头像  用空字符串来填充
          var acceptAvators = that.data.acceptAvators
          var leave = acceptAvators.length % 4
          if (leave) {
            for (var i = 0; i < 4 - leave; i++) {
              var obj = { avatar: "" }
              acceptAvators.push(obj)
            }
          }
          that.setData({
            acceptAvators: acceptAvators
          })
          
        }

        //请求完成 隐藏loading动画
        wx.hideLoading()

      },
      fail: function(){

        wx.showModal({
          title: 'error',
          content: '网络原因，请重试~~~~',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    })
  },


  // 跳转到制作邀请函页面
  tab: function(event) {
      wx.navigateTo({
        url: '../invite/invite',
      })
  },

  // 保存输入框的内容
  saveMessage: function(e) {
    console.log(e.detail.value)
    this.setData({
      messageValue: e.detail.value
    })
  },


  //获取用户信息(由于接口改变需要使用button按钮)
  bindGetUserInfo: function (e) {

    //获取点击那个按钮
    var buttontype= e.currentTarget.dataset.id
    console.log(buttontype)
    if (!this.data.IsuserInfo){
      var that = this
      wx.login({
        success: function (response) {
          var code = response.code
                    //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
                    wx.showLoading({
                      title: '登录中',
                    })

                    wx.request({
                      url: app.globalData.url + "/login",
                      method: "POST",
                      data: {
                        code: code,
                        iv: e.detail.iv,
                        encryptedData: e.detail.encryptedData
                      },
                      success: function (res) {

                        //请求完成 隐藏loading动画
                        wx.hideLoading()

                        //放置在全局中
                        app.globalData.userInfo = res.data;
                        console.log(res.data);

                        //本地存储个人信息
                        wx.setStorage({
                          key: "userInfo",
                          data: res.data
                        })

                        that.setData({
                          userInfo: res.data,
                          IsuserInfo: true
                        })

                        if (buttontype == 'make') {
                          that.tab()
                        } else if (buttontype == 'accept') {
                          that.accept()
                        } else if (buttontype == 'submitMessage') {
                          that.submitMessage()
                        } else {
                          that.addLike(buttontype)
                        }

                      }
                    })
        }
      })
    }else{
      if (buttontype == 'make') {
        this.tab()
      } else if (buttontype == 'accept') {
        this.accept()
      } else if (buttontype == 'submitMessage') {
        this.submitMessage()
      } else {
        this.addLike(buttontype)
      }
    }  
  },


  // 更新留言板
  submitMessage: function() {
    var that = this
    if (this.data.messageValue != ""){
      
      var tempmessage = {
        "id": this.data.userInfo.openId,
        "avatar": this.data.userInfo.avatarUrl,
        "nickname": this.data.userInfo.nickName,
        "content": this.data.messageValue,
        "goodnum": "0"
      }
      this.setData({
        messageCon: this.data.message
      })
      this.data.messageCon.push(tempmessage)
      var messages = this.data.messageCon
      this.setData({
        message: messages
      })

      //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
      wx.showLoading({
        title: '留言中',
      })

      wx.request({
        url: app.globalData.url + "/SetComment",
        method: "POST",
        data: {
          invite_id: this.data.inviteID,
          openId_id: this.data.userInfo.openId,
          content: this.data.messageValue

        },
        success: function (res) {

          //请求完成 隐藏loading动画
          wx.hideLoading()

          if (res.data.status == 200 ){

            wx.showToast({
              title: '留言成功',
              icon: 'success',
              duration: 2000
            })

            that.setData({
              messageValue: ""
            })

          }
        }
      })

    }else{

      wx.showModal({
        title: 'error',
        content: '留言不能为空~~~',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
    

  },

  //点赞功能
  addLike: function(e) {
    var current_id = e.currentTarget.dataset.id;   //获取留言id
    var toast = false

    //判断该用户是否已经点赞
    for (var i = 0; i < this.data.message.length; i++) {
      if (this.data.message[i].id == current_id && this.data.message[i].IsLikeflag) {
        toast = true
      }
    }

    if (!toast) {
      for (var i = 0; i < this.data.message.length; i++) {
        if (this.data.message[i].id == current_id) {
          this.setData({
            ['message[' + i + '].goodnum']: parseInt(this.data.message[i].goodnum) + 1,
            ['message[' + i + '].IsLikeflag']: true
          })
        }
      }

      //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
      wx.showLoading({
        title: '点赞中',
      })
      wx.request({
        url: app.globalData.url + "/SetLike",
        method: "POST",
        data: {
          comment_id: current_id,
          openId_id: this.data.userInfo.openId

        },
        success: function (res) {

          //请求完成 隐藏loading动画
          wx.hideLoading()

          if (res.data.status == 200) {

            wx.showToast({
              title: '点赞成功！',
              icon: 'success',
              duration: 2000
            })

          }

        }
      })
    } else {
      wx.showToast({
        title: '您已点赞！',
        icon: 'success',
        duration: 1000
      })
    }

  },

  //参与邀请函
  accept: function () {

    var Ispartner = false

    //如果保存有用户信息才可以点击  否则需要登录
    if (this.data.IsuserInfo) {

      var acceptAvators = this.data.acceptAvators
      var obj = { avatar: this.data.userInfo.avatarUrl }
      var leave = this.data.peoplenum % 4

      //添加前端限制允许一个用户只参与一次
      for (var i = 0; i < this.data.peoplenum; i++) {
        if (acceptAvators[i].avatar == this.data.userInfo.avatarUrl) {
          Ispartner = true
        }
      }

      //未报名才允许
      if (!Ispartner) {
        //如果为非零 先将数组中空值出栈 然后入栈一个值 接着填充一行不足四个元素
        //如果为零(换行情况) 先入栈一个值 接着填充一行三个空值元素
        if (leave) {
          for (var i = 0; i < 4 - leave; i++) {
            acceptAvators.pop()
          }
          acceptAvators.push(obj)
          leave++
          for (var i = 0; i < 4 - leave; i++) {
            acceptAvators.push("")
          }
        } else {
          acceptAvators.push(obj)
          for (var i = 0; i < 3; i++) {
            acceptAvators.push("")
          }
        }

        this.setData({
          acceptAvators: acceptAvators,
          peoplenum: (this.data.peoplenum + 1)
        })

        //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
        wx.showLoading({
          title: '报名中',
        })

        wx.request({
          url: app.globalData.url + "/SetPartner",
          method: "POST",
          data: {
            invite_id: this.data.inviteID,
            openId_id: this.data.userInfo.openId

          },
          success: function (res) {
            //请求完成 隐藏loading动画
            wx.hideLoading()

            if (res.data.status == 200) {
              wx.showToast({
                title: '报名成功！',
                icon: 'success',
                duration: 2000
              })
            }

          }
        })
      } else {

        wx.showToast({
          title: '您已报名！',
          icon: 'success',
          duration: 2000
        })

      }

    }
  }
})
