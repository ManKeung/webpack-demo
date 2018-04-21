// CSS处理 生成link标签

const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader/url' // link标签
          },
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}
