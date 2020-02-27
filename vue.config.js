module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PATH : '/'
}