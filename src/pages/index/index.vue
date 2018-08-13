<template>
  <div class="container">
    <!--头部头像昵称-->
    <headers></headers>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place :placeinfo="placeinfo" v-if="flag"></place>
      <!--邀请到朋友-->
      <partner :partnerinfo="partnerinfo" :inviteid="inviteid" v-if="flag"></partner>
      <!--留言板块-->
      <comment :commentinfo="commentinfo" :inviteid="inviteid" v-if="flag"></comment>
      <!--创建自己邀请函-->
      <owner></owner>
    </div>
    <!--canvas层-->
    <canvass :imgid="imgid" v-if="flag"></canvass>
    <!--星空版权声明-->
    <footers></footers>
  </div>
</template>

<script type="text/ecmascript-6">
import headers from '@/components/header'
import footers from '@/components/footer'
import place from '@/components/place'
import partner from '@/components/partner'
import comment from '@/components/comment'
import owner from '@/components/owner'
import canvass from '@/components/canvas'
import store from '@/utils/store'
import { http } from '@/utils/index'

export default {
  data () {
    return {
      flag: false, // 默认不显示
      userInfo: {}, // 用户个人信息
      placeinfo: {}, // 选择地方及文案
      partnerinfo: {}, // 参与者
      commentinfo: {}, // 评论
      inviteid: 0, // 邀请函ID值
      imgid: '' // 小程序码ID用于canvas生成
    }
  },

  methods: {
  },
  mounted () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.flag = true
      this.imgid = this.userInfo.openId
      store.dispatch('setUser', userInfo)
    }
    http.post('BackInfo', {openid: this.userInfo.openId})
      .then(result => {
        this.placeinfo.pic = result.siteImg
        this.placeinfo.text = result.invitewords
        this.partnerinfo = result.acceptedAvators
        this.commentinfo = result.message
        this.inviteid = result.inviteID
        console.log(result)
      })
  },
  components: {
    headers,
    footers,
    place,
    partner,
    comment,
    owner,
    canvass
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
