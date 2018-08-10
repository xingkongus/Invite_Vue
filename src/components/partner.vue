<template>
  <div class="partner">
    <div class="partner_title">已邀请到</div>
    <div class="partner_num">{{partnernum}}</div>
    <div class="partner_people">人</div>
    <div class="partner_detail">
      <img class="partner_avatar" v-for="item in partnerinfo" :src="item.avatar" :key="item.id">
    </div>
    <button class="partner_join" open-type="getUserInfo" @getuserinfo="getUserInfoCallBack">我要去</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { http, utils } from '@/utils/index'
  import store from '@/utils/store'
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    props: ['partnerinfo', 'inviteid'],
    methods: {
      getUserInfoCallBack (e) {
        let data = e.mp.detail
        let userInfo = wx.getStorageSync('userInfo')
        // 未登录情况才执行
        if (!userInfo) {
          utils.wx_userinfo(data.iv, data.encryptedData)
            .then(res => {
              store.commit('setUser', { // 通知vuex改变状态
                userInfo: res
              })
            })
        }
        this.userInfo = userInfo
        // 添加前端限制允许一个用户只参与一次
        // 传统for循环方式
        // let ispartner = true
        // for (let i = 0; i < this.partnernum; i++) {
        //   if (this.partnerinfo[i].avatar === this.userInfo.avatarUrl) {
        //     ispartner = false
        //   }
        // }
        // // 若还未参加则加入 否则提示已经参加
        // if (ispartner) {
        //   let obj = {avatar: this.userInfo.avatarUrl}
        //   this.partnerinfo.push(obj)
        //   http.post('SetPartner', {invite_id: this.inviteid, openId_id: this.userInfo.openId})
        //     .then(result => {
        //       console.log(result)
        //     })
        //   utils.toast('报名成功！')
        // } else {
        //   utils.toast('您已报名！')
        // }
        // 采用filter过滤器方法
        if (this.partnerinfo.filter(v => v.avatar === this.userInfo.avatarUrl).length) {
          utils.toast('您已报名！')
        } else {
          let obj = {avatar: this.userInfo.avatarUrl}
          this.partnerinfo.push(obj)
          http.post('SetPartner', {invite_id: this.inviteid, openId_id: this.userInfo.openId})
            .then(result => {
              console.log(result)
            })
          utils.toast('报名成功！')
        }
      }
    },
    computed: {
      partnernum () { // 计算数组长度
        return this.partnerinfo.length
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    width 100%
    height auto
    .partner
      width 100%
      text-align center
      color #fff
      .partner_title
        font-size 38px
      .partner_num
        display inline-block
        font-size 50px
      .partner_people
        display inline-block
      .partner_detail
        display flex
        flex-wrap wrap
        flex-direction row
        position relative
        width 90%
        min-height 100px
        margin 20px auto 0 auto
        background-color #fff
        border-radius 5px
        &:before
          content ""
          position absolute
          width 0
          height 0
          top -50px
          left calc(60% - 60px)
          border 29px transparent solid
          border-bottom-color #fff
        img
          margin 9px
          width 65px
          height 65px
          border-radius 50%
      .partner_join
        width 80%
        height 62.5px
        line-height 62.5px
        margin 50px auto 0
        border-radius 50px
        background-color #02d1d3
        color #fff
        font-size 21px
        font-weight bold
</style>
