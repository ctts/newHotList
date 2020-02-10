module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? 'http://localhost:3000/' : '/'
}