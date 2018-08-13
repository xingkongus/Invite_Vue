<template>
  <div>
    <canvas canvas-id="canvas"></canvas>
    <div class='qrcode'>
      <img class='qrcode_img' src="/static/code.png" @click="save" >
      <p>点击图片保存小程序码</p>
      <p>分享到朋友圈</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { utils } from '@/utils/index'
  export default {
    props: ['imgid'],
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
            src: 'https://api.icharle.com/img/invitebg.png'
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
            src: 'https://api.icharle.com/img/' + this.imgid + '.png'
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
          success: res => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                utils.showModal('分享二维码已保存到系统相册', '快去分享给朋友，让更多的朋友发现这里的美好')
              },
              fail: err => { console.log(err) }
            })
          },
          fail: err => { console.log(err) }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  canvas
    position absolute
    left -100000px
    width 875px
    height 1301px
  .qrcode
    display flex
    flex-direction column
    text-align center
    margin-bottom 25px
    color #fff
    .qrcode_img
      width 187.5px
      height 187.5px
      margin-bottom 10px
</style>
