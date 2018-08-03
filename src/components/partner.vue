<template>
  <div class="partner">
    <div class="partner_title">已邀请到</div>
    <div class="partner_num">14</div>
    <div class="partner_people">人</div>
    <div class="partner_detail">
      <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
      <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
      <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
      <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
      <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
    </div>
    <div class="partner_join">我要去</div>
  </div>
</template>

<script>
  export default {
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
