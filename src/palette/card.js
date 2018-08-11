export default class LastMayday {
  do () {
    return this._template()
  }

  TEXT_SMALL = {
    fontSize: '12px'
  }

  _template () {
    return ({
      background: '/static/invitebg.png',
      width: '875px',
      height: '1301px',
      borderRadius: '10px',
      views: [
        {
          type: 'image',
          url: 'https://api.icharle.com/img/oO9MA5ZLPn_3Iyvn7jQbMu0IZhy0.png',
          css: {
            bottom: '70px',
            left: '310px',
            width: '250px',
            height: '250px'
          }
        }
      ]
    })
  }
}
