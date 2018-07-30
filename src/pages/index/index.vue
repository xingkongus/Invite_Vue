<template>
  <div class="test">
    <div class="test2">{{motto}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
  },

  methods: {
  },

  created () {
  }
}
</script>

<style lang="stylus">
  .test
      font-size 70rpx
      .test2
        font-size 30rpx
</style>
