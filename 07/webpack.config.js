// css + scss 提取css

const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true, // 同一个标签
              transform: './css.transform.js' // 路径
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true, // 压缩
                modules: true, // css modules 开启
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                indent: 'postcss',
                plugins: [
                  // require('cssnano')(), // css min
                  // require('autoprefixer')(), // css兼容性
                  require('postcss-cssnext')() // 未来css语言
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false // 提取css范围
    })
  ]
}
