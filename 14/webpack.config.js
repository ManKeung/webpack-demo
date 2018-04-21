// html

const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name]-bundle-[hash:5].css',
  allChunks: false // 提取css范围
})

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist/', // 去掉这可避免引入出错
    publicPath: '/',
    filename: '[name]-bundle-[hash:5].js'
    // chunkFilename: '[name].bundle.js'
  },

   resolve: { // 解析本地 libs 里的第三js方库
    alias: {
      jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
    }
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
              // transform: './css.transform.js' // 路径
            }
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-sprites')({
                    spritePath: 'dist/assets/imgs/sprites',
                    retina: true // 视网膜屏 @2x
                  }), // 雪碧图
                ]
              }
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          // { // 图片操作
          //   loader: 'file-loader',
          //   options: {
          //     publicPath: '../assets/imgs',
          //     // outputPath: 'dist/',
          //     useRelativePath: true
          //   }
          // }
          { // 图片转成base：64 比file-loader多个转成bas64
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 1000, // 小于5k转base64
              // publicPath: '../assets/imgs/sprites',
              outputPath: 'assets/imgs/'
              // useRelativePath: true
            }
          },
          { // 压缩图片
            loader: 'img-loader',
            options: {
              pngquant: { // png
                quality: 80
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|woff|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 5000,
              publicPath: '../assets/fonts',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: path.resolve(__dirname, 'src/index.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              $: 'jquery'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
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

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['index'], // 范围
      minify: { // 压缩
        collapseWhitespace: true
      }
      // inject: false // 生成的css 和 js 不自动插入页面
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
}
