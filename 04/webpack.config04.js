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
            loader: 'style-loader',
            options: {
              insertInto: '#app', // 出入到dom
              singleton: true, // 同一个标签
              transform: './css.transform.js' // 路径
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
