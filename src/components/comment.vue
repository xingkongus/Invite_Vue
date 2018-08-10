<template>
  <div class="comment">
    <div class="comment_title">朋友留言</div>
    <scroll-view scroll-y class="comment_detail">
      <div class="comment_user" v-for="(item,index) in commentinfo" :key="item.id">
        <div class="user_detail">
          <img class="user_avatar" :src="item.avatar" >
          <div class="user_name">{{item.nickname}}</div>
          <div class="praise">
            <div class="ispraise" :class="[ item.IsLikeflag ? 'pass' : 'loser']" @click="addlike(index,item.id)"></div>
            <div class="praise_num">{{item.goodnum}}</div>
          </div>
        </div>
        <div class="user_content">{{item.content}}</div>
      </div>
    </scroll-view>
    <div class="comment_send">
      <textarea placeholder="给朋友留言的地方~点击我点击我！" class="comment_text" v-model="text"></textarea>
      <button class="comment_button" open-type="getUserInfo" @getuserinfo="getUserInfoCallBack">留言</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { http, utils } from '@/utils/index'
  import store from '@/utils/store'
  export default {
    data () {
      return {
        userInfo: {}, // 用户详细信息
        text: '' // 评论输入框内容
      }
    },
    props: ['commentinfo', 'inviteid'],
    methods: {
      getUserInfoCallBack (e) {
        let data = e.mp.detail
        let userInfo = wx.getStorageSync('userInfo')
        // 未登录情况才执行
        if (!userInfo) {
          utils.wx_userinfo(data.iv, data.encryptedData)
            .then(res => {
              store.commit('setUser', { // 通知vuex改变状态
                userInfo: res
              })
            })
        }
        this.userInfo = wx.getStorageSync('userInfo')
        let tempmessage = {
          'avatar': this.userInfo.avatarUrl,
          'nickname': this.userInfo.nickName,
          'content': this.text,
          'goodnum': 0,
          'IsLikeflag': false
        }
        this.commentinfo.push(tempmessage)
        http.post('SetComment', {invite_id: this.inviteid, openId_id: this.userInfo.openId, content: this.text})
          .then(result => {
            console.log(result)
          })
        this.text = ''
      },
      // 点赞 (index为数组索引值  id为点击评论的id号)
      addlike (index, id) {
        this.userInfo = wx.getStorageSync('userInfo')
        if (this.commentinfo.filter(v => v.id === id && v.IsLikeflag).length) { // 判断是否已经点赞(采用filter过滤器)
          utils.toast('您已点赞！')
        } else {
          this.commentinfo[index].IsLikeflag = true
          this.commentinfo[index].goodnum += 1
          http.post('SetLike', {comment_id: id, openId_id: this.userInfo.openId})
            .then(result => {
              console.log(result)
            })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    width 100%
    height auto
    .comment
      margin 55px auto 0
      .comment_title
        text-align center
        font-size 27.5px
        font-weight blod
        color #fff
      .comment_detail
        width 86%
        height 540px
        margin 12.5px auto 11px auto
        border-radius 5px
        background-color #fff
        .comment_user
          min-height 80px
          margin 17px 25px 21px
          padding-bottom 15px
          border-bottom 1px solid #aaa
          .user_detail
            display flex
            .user_avatar
              display inline-block
              width 52.5px
              height 52.5px
              border-radius 50%
            .user_name
              display inline-block
              flex 1
              line-height 52.5px
              margin-left 13px
              font-size 20px
              font-weight bold
              color #505050
            .praise
              display inline-block
              width 60px
              height 50px
              margin-top 15px
              .ispraise
                display inline-block
                width 22.5px
                height 22.5px
                background-size 100% auto
                background-repeat no-repeat
                background-position center
                &.pass
                  background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAApCAYAAABOScuyAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAshJREFUWIXV2U+oFVUcwPHPG8RdJYGtw8QMhUdKEf072kYIlUSUEhJ3bRIpoaKCxyySRClRV+0khUe8Rf5PosWtFqIS8spFilKCFaK+IsKeEq/FeQ/Hy525M/eNb7zf3Zxz5jdf5p575vc7Z2Bi+XIFLMMKDGI+5k62/4qfcQYnMFoUJMNjk/GewROYh1m4jkv4Cd+kIRzOCzCQI/wUPsHzJUWGsQVXc/pnYyc2l4x3DlvTEE60dyQdBr+LU8rLwqu4gFUd+p4Uf42ysrAIXw21WnvaO9qF38fHFQJneRCHsCHT9qI4bR7tMeabQ63WZ9mG7JRYi5EeA7cziCu4VlO8D9IQtnFH+CH8WVNw+Bs38UiNMRekIVyYmhIf1hgYHlCvLOwmvuE54rLS6Q94v7EowWr9IQvrEjzXtEUFnk2wtGmLCixM8HjTFhV4ONE/8xcGEkw0bVGBiX57w0kiJi39wlgiJif9wvkEp5u2qMDpBMeatqjA0QSXcaRpkxJcTEP4dmqF2NmoSjk+4s6S1hLLmPuVcRzg7jV4YzMupXgjDeEWdwufwhfN+BQymoawb+qi/Su3Abdm1qcrL2cv2oX/w8qZc+nK5jSEK9mGTnnE19g+Mz6FfJmGsLe9MS/xeQ8H761PIaNpCGs6dRRlaq/g5L3xKeQyXsrr7JZaLhM36WaKfxDSEK7nDegmPI4luFinVQ7/Ymkawi9Fg8ok73+Ju5nnapDK4waeTkPo+rUtW22MidX1D9OxyuE38c3+WGZwlfJoXJSuM7M7i8XdpkGWXuq5VdjVw33tjGBJGsJYlZt6LUDfwts93kvc3V+nh4p9OhXzp3hBnN9VeA1be33odEv878Xt/eMlxp4VN7qHp/PAOvYkfhczqh0FY/aLZx1lT5tyqXMT5R3xTOOPTNttrMfrdT1kVl2BJvlOPH/7HHOwSc1fyf8BvNiJl3/0RuMAAAAASUVORK5CYII=")
                &.loser
                  background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAApCAYAAABOScuyAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAsVJREFUWIXV2U+oFVUcwPHPG6SdJYWtpYxqjCKliNKSNkFkGGGUULQJN0mUUCFtHxRKRbVqFynIw0WlVhItLBeiEfLMH2QoJfSHwB4tBJ8Rtjjv4Xi5M3fm3vFO97ubc8785svM4czvd87UzMyMCtbjEdyFlVi+0P4LfsR3OIjZqiAFbl6Idx9ux01YgnM4gx/wdUTsKwswVSJ8D97G2poie/AS/izpvwY7sbVmvJPYFhEHezuyPoNfw1H1ZeFp/IQNffrulr5GXVlYhS/zPH+/t6NXeDvebBC4yLX4DJsLbQ9K02bFkDFfzPP8w2JDUfhJTA8ZuMhu3IkbcEj/r9iEF/I83754sRjsOuwdMXCRw4gW403neX4Ll4XfaDE4LMWNLcd8j7RKLJOWlVE/3ThYleFxkyELmzI80LVFA+7PsKZriwbcluHWri0acH1mcuYvTGW41LVFAy5N2hvOMilpmRTmMik5mRROZTjWtUUDjmX4vGuLBhzIcBb7uzapwemI+GZxhdjZqUo9prm8pB2Sypj/K/NSYXDFGvxcNy612BIRF7lS+Cgqa/6OmI2IjxYvev9ym3FxvD4DebR40Sv8Lx4bn8tAtkbEr8WGfnnEV3hrPD6VfBIRH/Q2liU+r+PTq+tTyWxEPNGvoypT24gjV8enkrN4uKxzUGq5XtqkGxfn8VBEnCsbMEh4Hqtxuk2rEi5gTUT8XDWoTvL+t7SbebIFqTL+wr0RMfBvW7famJOq6+9HsSrhN+nNnqgzuEl5NC9Jt5nZHccdg6ZBkWHquQ14d4j7etmL1REx1+SmYQvQl/HKkPeSdvc3GaJiH6VifgfrpPndhGewbdiHjlriH5a297+oMfa4dLizZ5QHtrEn8buUUe2oGLNLOuuoe9pUSpubKK9KZxp/FNr+wVN4tq2HLGkr0ALfSudvH2MZntfyX/I/jT2Xj9ciGMYAAAAASUVORK5CYII=")
              .praise_num
                display inline-block
                padding-left 2px
                color #505050
                font-size 20px
          .user_content
            text-indent 35px
            font-size 17.5px
            color #505050
      .comment_send
        width 90%
        margin 0 9%
        .comment_text
          display inline-block
          width 60%
          padding 2.5px 4px
          height 55px
          border-radius 5px
          border 1px solid #aaa
          background-color #fff
        .comment_button
          display inline-block
          margin-left 10px
          width 80px
          height 60px
          line-height 60px
          border-radius 5px
          font-size 19px
          font-weight bold
          background-color #25b5ff
          color #fff
</style>
