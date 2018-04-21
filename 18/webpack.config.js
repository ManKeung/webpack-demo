// 调试

const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    filename: 'js/[name]-bundle-[hash:5].js'
    // chunkFilename: '[name].bundle.js'
  },

  // devtool: 'eval', // js 调试 速度非常快
  // devtool: 'source-map', // js 调试 线上
  devtool: 'cheap-module-source-map', // js 调试 开发可选择 有点损耗开发性能（刚开始比较慢）

  devServer: {
    // inline: false, // 页面里显示打包状态
    port: 9001, // 端口
    proxy: { // 请求远端服务器
      '/': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { // 重定向
          '^/comments': '/api/comments'
        },
        headers: {
          'Cookie': '_T_WM=1ae517c8cadd69766e5dbcb3b55d6983; TMPTOKEN=JFP6NpeQvnpO0hyHiErBqlks5GIWDl8hxUeGYrlpbx3pFMCW484DxiQT14uKGjtb; SUB=_2A2533DEODeRhGeRG6FUR8ifMyzyIHXVVP19GrDV6PUJbkdANLW_2kW1NUjYDCEV5vSxEgYBB4v-WnnloFeCnqkoy; SUHB=0FQq97vatmNY9m; SCF=AoiwqrzW8wqnA__LYKhE8jeCOW7NSsEkBu753NUreVnsAlYIkhvlv6gVwZwefDoCItKSWVe0Trh69fkMrlAaEa0.; SSOLoginState=1524121950; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=luicode%3D20000174%26uicode%3D20000061%26fid%3D4230532655339827%26oid%3D4230532655339827'
        }
      }
    },
    hot: true,
    hotOnly: true,
    historyApiFallback: { // 匹配页面
      rewrites: [
        {
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function(context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    }
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
        use: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true, // 同一个标签 在同一个标签 不能css调试 比较坑
              // transform: './css.transform.js' // 路径
              sourceMap: true // css 调试
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true // css 调试
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true, // css 调试
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
            loader: 'sass-loader',
            options: {
              sourceMap: true // css 调试
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
              // plugins: ['lodash']
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

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      // chunks: ['index'], // 范围
      minify: { // 压缩
        collapseWhitespace: true
      }
      // inject: false // 生成的css 和 js 不自动插入页面
    }),

    // new webpack.optimize.UglifyJsPlugin(),

    new CleanWebpackPlugin(['dist']),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ]
}
