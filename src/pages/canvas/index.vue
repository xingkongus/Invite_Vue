<template>
  <div>
    <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template"></painter>
    <button style="margin-top:20px" @click="save">保存</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import Card from '../../palette/card'
  const card = new Card()
  const template = card.do()
  export default {
    data () {
      return {
        shareImg: '',
        template: template
      }
    },
    methods: {
      save () {
        wx.saveImageToPhotosAlbum({
          filePath: this.shareImg,
          success (res) {
            wx.showModal({
              title: '分享二维码已保存到系统相册',
              content: '快去分享给朋友，让更多的朋友发现这里的美好',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          },
          fail (res) {
            wx.hideLoading()
          }
        })
      },
      onImgOk (e) {
        this.shareImg = e.mp.detail.path
        // 两种路径是一样的
        console.log(e.mp.detail.path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
