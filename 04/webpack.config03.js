// CSS处理 style-loader/useable

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
            loader: 'style-loader/useable'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
