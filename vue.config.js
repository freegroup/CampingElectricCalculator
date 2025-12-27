const path = require('path')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/CampingElectricCalculator/',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true,
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      }
    }
  }
}
