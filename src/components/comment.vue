<template>
  <div class="comment">
    <div class="comment_title">朋友留言</div>
    <scroll-view scroll-y class="comment_detail">
      <div class="comment_user">
        <div class="user_detail">
          <img class="user_avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QtOO2flJAnibpc2lGnGuiaicyKHibIaqUya2ohrArJKicLpgPuPK2Mez8jbqibnKibL1O7hTyYicHoDD6bywpkwHxMCBNQ/132" >
          <div class="user_name">Icharle</div>
          <div class="praise">
            <div class="ispraise"></div>
            <div class="praise_num">300</div>
          </div>
        </div>
        <div class="user_content">我是第一空间给人家的快感和风华绝代双方和解我发给瑞关键时刻分工会开始放寒假开完会条留言</div>
      </div>
    </scroll-view>
    <div class="comment_send">
      <textarea placeholder="给朋友留言的地方~点击我点击我！" class="comment_text"></textarea>
      <button class="comment_button">留言</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
                background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAApCAYAAABOScuyAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAshJREFUWIXV2U+oFVUcwPHPG8RdJYGtw8QMhUdKEf072kYIlUSUEhJ3bRIpoaKCxyySRClRV+0khUe8Rf5PosWtFqIS8spFilKCFaK+IsKeEq/FeQ/Hy525M/eNb7zf3Zxz5jdf5p575vc7Z2Bi+XIFLMMKDGI+5k62/4qfcQYnMFoUJMNjk/GewROYh1m4jkv4Cd+kIRzOCzCQI/wUPsHzJUWGsQVXc/pnYyc2l4x3DlvTEE60dyQdBr+LU8rLwqu4gFUd+p4Uf42ysrAIXw21WnvaO9qF38fHFQJneRCHsCHT9qI4bR7tMeabQ63WZ9mG7JRYi5EeA7cziCu4VlO8D9IQtnFH+CH8WVNw+Bs38UiNMRekIVyYmhIf1hgYHlCvLOwmvuE54rLS6Q94v7EowWr9IQvrEjzXtEUFnk2wtGmLCixM8HjTFhV4ONE/8xcGEkw0bVGBiX57w0kiJi39wlgiJif9wvkEp5u2qMDpBMeatqjA0QSXcaRpkxJcTEP4dmqF2NmoSjk+4s6S1hLLmPuVcRzg7jV4YzMupXgjDeEWdwufwhfN+BQymoawb+qi/Su3Abdm1qcrL2cv2oX/w8qZc+nK5jSEK9mGTnnE19g+Mz6FfJmGsLe9MS/xeQ8H761PIaNpCGs6dRRlaq/g5L3xKeQyXsrr7JZaLhM36WaKfxDSEK7nDegmPI4luFinVQ7/Ymkawi9Fg8ok73+Ju5nnapDK4waeTkPo+rUtW22MidX1D9OxyuE38c3+WGZwlfJoXJSuM7M7i8XdpkGWXuq5VdjVw33tjGBJGsJYlZt6LUDfwts93kvc3V+nh4p9OhXzp3hBnN9VeA1be33odEv878Xt/eMlxp4VN7qHp/PAOvYkfhczqh0FY/aLZx1lT5tyqXMT5R3xTOOPTNttrMfrdT1kVl2BJvlOPH/7HHOwSc1fyf8BvNiJl3/0RuMAAAAASUVORK5CYII=")
              .praise_num
                display inline-block
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
