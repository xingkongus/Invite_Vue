// pages/invite/invite.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},     //用户详细信息
    bgURL: "https://icharle-1251944239.cosgz.myqcloud.com/xingkong/bg.jpg",   //背景图片
    siteURL: "/images/administrate.png",    //传入后台图片链接
    isPreview: false,
    stairsimg: "/images/5.png",
    administraimg: "/images/1.png",
    groundimg: "/images/4.png",
    libimg: "/images/2.png",
    invitewords: "大家好，我是xxx,明天我要在行政楼在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~" // 邀请函的内容
  },
  onLoad: function () {
    var that = this

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      },
    })
  },
  changeSite: function (e) {
    var eid = e.currentTarget.id
    if (eid == "administrate") {
      this.setData({
        siteURL: "/images/administrate.png",
        invitewords: "大家好，我是xxx,明天我要在行政楼在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~"
      })
    } else if (eid == "library") {
      this.setData({
        siteURL: "/images/library.png",
        invitewords: "大家好，我是xxx，光阴荏苒，岁月如梭，逝者如斯夫，明天我要在图书馆门口在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~"
      })
    } else if (eid == "stairs") {
      this.setData({
        siteURL: "/images/huozhong.png",
        invitewords: "大家好，我是xxx，光阴荏苒，岁月如梭，逝者如斯夫，明天我要在百步梯在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~"
      })
    } else if (eid == "ground") {
      this.setData({
        siteURL: "/images/ground.png",
        invitewords: "大家好，我是xxx，光阴荏苒，岁月如梭，逝者如斯夫，明天我要在田径场在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~"
      })
    }
  },

  //预览按钮
  tabpreview: function () {
    this.setData({
      isPreview: (!this.data.isPreview)
    });
  },

  //完成制作按钮
  tabfinish: function (e) 　{
    var that = this
    var pic = this.data.siteURL;
    var content = this.data.invitewords;
    //首次进入防止网络问题出现页面一直无法显示(添加loading动画)
    wx.showLoading({
      title: '制作中',
    })
    wx.request({
      url: app.globalData.url + "/SetInvite",
      method: "POST",
      data: {
        openId_id: this.data.userInfo.openId,
        content: content,
        pic: pic
      },
      success: function (res) {

        //请求完成 隐藏loading动画
        wx.hideLoading()

        that.RequestUrl()     //制作图片

        if (res.data.status = 200) {

          wx.showToast({
            title: '邀请函创建成功',
            icon: 'success',
            duration: 2000
          })

          wx.navigateTo({
            url: '../index/index',
          })
        } else {
          console.log('创建失败');
        }
      }
    })
  },

  //编辑按钮框设置邀请函文字
  inInviteword: function(e) {
    this.setData({
      invitewords: e.detail.value
    })
  },


  //请求图片
  RequestUrl: function (){

    wx.request({
      url: app.globalData.url + "/GetUrl",
      method: "POST",
      data: {
        scene: this.data.userInfo.openId,
      },
      success: function (res) {
        if (res.data.status = 200) {
          console.log('请求成功')
        } else {
          console.log('请求失败');
        }
      }
    })

  }
})