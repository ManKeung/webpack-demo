const path = require('path')
const webpack = require('webpcak')

module.exports = {
  entry: {
    vue: ['vue', 'vue-router'],
    ui: ['element-ui']
  },

  output: {
    path: path.join(__dirname, '../src/dll/'),
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../src/dll/', '[name]-manifest.json'),
      name: '[name]'
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
}

// $ webpack --config build/webpack.dll.conf.js
