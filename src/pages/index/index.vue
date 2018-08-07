<template>
  <div class="container">
    <!--头部头像昵称-->
    <headers></headers>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place></place>
      <!--邀请到朋友-->
      <partner></partner>
      <!--留言板块-->
      <comment></comment>
      <!--创建自己邀请函-->
      <owner></owner>
    </div>
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

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
  },

  created () {
  },
  components: {
    headers,
    footers,
    place,
    partner,
    comment,
    owner
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
