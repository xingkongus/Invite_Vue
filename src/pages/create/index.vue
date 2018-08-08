<template>
  <div class="container">
    <!--头部头像昵称-->
    <headers></headers>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place></place>
    </div>
    <!--星空版权声明-->
    <footers></footers>
  </div>
</template>

<script type="text/ecmascript-6">
  import headers from '@/components/header'
  import footers from '@/components/footer'
  import place from '@/components/place'
  import store from '@/utils/store'
  export default {
    created () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        store.commit('setUser', {
          userInfo: userInfo
        })
      }
    },
    components: {
      headers,
      footers,
      place
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
