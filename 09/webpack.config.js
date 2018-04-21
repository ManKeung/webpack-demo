// css Tree

const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name].min.css',
  allChunks: false // 提取css范围
})

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
            }
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['lodash']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    extractSass,

    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/*.js'),
      ])
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
}
