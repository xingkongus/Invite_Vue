<template>
  <button class="create_owner" open-type="getUserInfo" @getuserinfo="getUserInfoCallBack">制作我的邀请函</button>
</template>

<script type="text/ecmascript-6">
  import { utils } from '@/utils/index'
export default {
    methods: {
      getUserInfoCallBack (e) {
        let data = e.mp.detail
        utils.wx_userinfo(data.iv, data.encryptedData)
          .then(res => {
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    .create_owner
      margin 35px auto 30px auto
      width 80%
      height 67.5px
      background-color #fcff25
      line-height 67.5px
      color #ff8400
      font-size 22.5px
      font-weight bold
</style>
