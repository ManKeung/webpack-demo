// css + sass

const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true, // 同一个标签
              transform: './css.transform.js' // 路径
            }
          },
          {
            loader: 'css-loader',
            options: {
              // minimize: true, // 压缩
              modules: true, // css modules打开
              localIdentName: '[path][name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
