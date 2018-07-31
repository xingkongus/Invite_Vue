<template>
  <div class="footer">星空学生创新中心丨Copyright©{{year}}</div>
</template>

<script>
  export default {
    computed: {
      // 动态计算当前年份
      year () {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style lang="stylus">
  .footer
    color #aaa
    font-size 24rpx
</style>
