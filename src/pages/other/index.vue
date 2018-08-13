<template>
  <div class="container">
    <!--头部头像昵称-->
    <div class="header">
      <img class="userinfo_avatar" :src="userInfo.avatarUrl">
      <p class="userinfo_nickname">{{userInfo.nickName}}</p>
      <p class="title">的邀请函</p>
    </div>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place :placeinfo="placeinfo"></place>
      <!--邀请到朋友-->
      <partner :partnerinfo="partnerinfo" :inviteid="inviteid"></partner>
      <!--留言板块-->
      <comment :commentinfo="commentinfo" :inviteid="inviteid"></comment>
      <!--创建自己邀请函-->
      <owner></owner>
    </div>
    <!--星空版权声明-->
    <footers></footers>
  </div>
</template>

<script type="text/ecmascript-6">
  import footers from '@/components/footer'
  import place from '@/components/place'
  import partner from '@/components/partner'
  import comment from '@/components/comment'
  import owner from '@/components/owner'
  import { http } from '@/utils/index'
  export default {
    data () {
      return {
        userInfo: {}, // 用户个人信息
        placeinfo: {}, // 选择地方及文案
        partnerinfo: {}, // 参与者
        commentinfo: {}, // 评论
        inviteid: 0 // 邀请函ID值
      }
    },
    onLoad () {
      let options = this.$root.$mp.query
      http.post('BackInfofriend', {openid: options.scene})
        .then(result => {
          this.userInfo.avatarUrl = result.avatarUrl
          this.userInfo.nickName = result.nickName
          this.placeinfo.pic = result.siteImg
          this.placeinfo.text = result.invitewords
          this.partnerinfo = result.acceptedAvators
          this.commentinfo = result.message
          this.inviteid = result.inviteID
          console.log(result)
        })
    },
    mounted () {
    },
    components: {
      footers,
      place,
      partner,
      comment,
      owner
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    width 100%
    height auto
    color #fff
    .userinfo_avatar
      display block
      margin 0 auto 15px
      width 128px
      height 128px
      border-radius 50%
    .userinfo_nickname
      text-align center
      font-size 40px
    .title
      text-align center
      font-size 20px
</style>
