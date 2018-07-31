<template>
  <div class="container">
    <headers></headers>
    <div class="content"></div>
    <footers></footers>
  </div>
</template>

<script type="text/ecmascript-6">
import headers from '@/components/header'
import footers from '@/components/footer'

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
    footers
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
