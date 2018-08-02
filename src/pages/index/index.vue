<template>
  <div class="container">
    <!--头部头像昵称-->
    <headers></headers>
    <!--中间内容部分-->
    <div class="content">
      <!--拍照地点及内容-->
      <place></place>
      <!--邀请到朋友-->
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
        <img class="partner_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
        </div>
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
    place
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
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
        width 100%
        min-height 100px
        margin-top 20px
        background-color #fff
        border-radius 5px
        &:before
          content ""
          position absolute
          width 0
          height 0
          top -50px
          left 39%
          border 29px transparent solid
          border-bottom-color #fff
        img
          margin 9px
          width 60px
          height 60px
          border-radius 50%
</style>
