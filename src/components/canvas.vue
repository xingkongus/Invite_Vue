<template>
  <div>
    <div style="position: absolute; left: -100000px">
      <painter @imgOK="onImgOk" :palette="template" />
    </div>
    <div class='qrcode'>
      <img class='qrcode_img' src="/static/code.png" @click="save" >
      <p>点击图片保存小程序码</p>
      <!-- <p>分享到朋友圈</p> --> 
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { utils, IMG_HOST } from '@/utils/index'
  export default {
    props: ['imgid'],
    data () {
      return {
        shareImg: '',
        template: {}
      }
    },
    methods: {
      onImgOk (e) {
        utils.hideLoading() // 隐藏loading
        this.shareImg = e.mp.detail.path
        wx.saveImageToPhotosAlbum({
          filePath: this.shareImg,
          success: res => {
            // utils.showModal('分享二维码已保存到系统相册', '快去分享给朋友，让更多的朋友发现这里的美好')
            utils.showModal('分享二维码已保存到系统相册', '快去分享吧')         
          },
          fail: err => { console.log(err) }
        })
        this.template = {} // 重置,下次点击生成时重新生成
      },
      save () {
        utils.showLoading('绘制分享图片中')
        // 绘制样式
        this.template = {
          background: '/static/invitebg.png',
          width: '875px',
          height: '1301px',
          borderRadius: '10px',
          views: [
            {
              type: 'image',
              url: IMG_HOST + this.imgid + '.png',
              css: {
                bottom: '70px',
                left: '310px',
                width: '250px',
                height: '250px'
              }
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
