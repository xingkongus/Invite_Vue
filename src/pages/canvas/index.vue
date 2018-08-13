<template>
  <div>
    <canvas canvas-id="canvas"></canvas>
    <button @click="save">导出</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        width: 0,
        height: 0
      }
    },
    canvasOptions: {
      canvasId: 'canvas'
    },
    renderCanvas (h) {
      return h('view', [
        h('image', {
          props: {
            src: 'http://icharle-1251944239.cosgz.myqcloud.com/xingkong/invitebg.png'
          },
          style: {
            left: 0,
            top: 0,
            width: 875,
            height: 1301
          }
        }),
        h('image', {
          props: {
            src: 'https://api.icharle.com/img/oO9MA5ZLPn_3Iyvn7jQbMu0IZhy0.png'
          },
          style: {
            left: 310,
            top: 981,
            width: 250,
            height: 250
          }
        })
      ])
    },
    methods: {
      save () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 1175,
          height: 1451,
          canvasId: 'canvas',
          success: function (res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
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
                console.log(res)
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  canvas
    width 875px
    height 1301px
</style>
