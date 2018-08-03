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
    comment
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
