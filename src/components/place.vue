<template>
  <div class="place">
    <img class="place_img" src="/static/ground.png" mode="widthFix"/>
    <textarea class="place_content">大家好，我是xxx，光阴荏苒，岁月如梭，逝者如斯夫，明天我要在田径场在拍毕业照啦，快来和我一起拍照留念吧，我的电话是xxxx，诚望百忙之中拨冗赏光，吾辈荣幸之至~</textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    width 100%
    height auto
    .place
      width 90%
      margin 0 auto
      position relative
      .place_img
        width 100%
        border-radius 5px
      .place_content
        position absolute
        padding-left 6%
        width 90%
        top 25px
        left 0
        color #505050
        font-size 19px
</style>
