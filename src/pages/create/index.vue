<template>
  <div class="container">
    <!--头部头像昵称-->
    <headers></headers>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place></place>
      <!--选择四个场景-->
      <div class="choose">
        <div class="administrate">
          <img src="/static/1.png" mode="widthFix" class="sitepic" >
          <p class="sitename">行政楼</p>
        </div>
        <div class="library">
          <img src="/static/2.png" mode="widthFix" class="sitepic" >
          <p class="sitename">图书馆</p>
        </div>
        <div class="activity">
          <img src="/static/5.png" mode="widthFix" class="sitepic" >
          <p class="sitename">活动中心</p>
        </div>
        <div class="ground">
          <img src="/static/4.png" mode="widthFix" class="sitepic" >
          <p class="sitename">田径场</p>
        </div>
      </div>
      <!--完成按钮、预览按钮、重做按钮-->
      <div class="btn">
        <button class="make">重做</button>
        <button class="finsh">完成</button>
      </div>
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
  .content
    .choose
      display flex
      margin 60px auto
      justify-content space-between
      width 90%
      .administrate
        width 20%
        padding 5px 1% 7.5px
        background-color #00a0e9
        border-radius 5px
        .sitepic
          width 100%
        .sitename
          text-align center
          font-size 15.5px
          font-weight blod
          color #fff
      .library
        width 20%
        padding 5px 1% 7.5px
        background-color #00a0e9
        border-radius 5px
        .sitepic
          width 100%
        .sitename
          text-align center
          font-size 15.5px
          font-weight blod
          color #fff
      .activity
        width 20%
        padding 5px 1% 7.5px
        background-color #00a0e9
        border-radius 5px
        .sitepic
          width 100%
        .sitename
          text-align center
          font-size 16.5px
          font-weight blod
          color #fff
      .ground
        width 20%
        padding 5px 1% 7.5px
        background-color #00a0e9
        border-radius 5px
        .sitepic
          width 100%
        .sitename
          text-align center
          font-size 15.5px
          font-weight blod
          color #fff
    .btn
      display flex
      margin 0 auto 50px auto
      justify-content space-around
      width 90%
      .make
        width 40%
        background-color #00c0ff
        color #007ba3
        font-weight bold
        border-radius 5px
      .finsh
        width 55%
        background-color #fcff25
        color #ff8400
        font-weight bold
        border-radius 5px
</style>
