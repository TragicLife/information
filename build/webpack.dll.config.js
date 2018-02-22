const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'vuex-router-sync', 'mint-ui']
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      // path: './build/[name].manifest.json',
      path: path.resolve(__dirname, '../[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}
