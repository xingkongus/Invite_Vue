<template>
  <div class="place">
    <img class="place_img" :src="placeinfo.pic" mode="widthFix"/>
    <textarea class="place_content" v-model="placeinfo.text"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        placeinfo: {}
      }
    },
    props: ['placeinfo']
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
