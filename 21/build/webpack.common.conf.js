const productionConfig = require('./webpack.prod.conf.js') // 生产配置
const developmentConfig = require('./webpack.dev.conf.js') // 开发配置
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // css提取
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge') // 生产开发
const path = require('path')
const webpack = require('webpack')

const generateConfig = env => {

  // 提取css
  const extractSass = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-bundle-[hash:5].css'
    // allChunks: false // 提取css范围
  })

  // js loader
  const scriptLoader = ['babel-loader']
    .concat(env === 'production'
      ? []
      : [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
      }]
  )

  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: env === 'development' // css 调试
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: env === 'development', // css 调试
        ident: 'postcss',
        plugins: [
          require('postcss-cssnext')()
        ].concat(
          env === 'production'
          ? require('postcss-sprites')({
              spritePath: 'dist/assets/imgs/sprites',
              retina: true // 视网膜屏 @2x
            }) // 雪碧图
          : []
        )
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: env === 'development' // css 调试
      }
    }
  ]

  const styleLoader = env === 'production'
    ? extractSass.extract({
      fallback: 'style-loader',
      use: cssLoaders
    })
    : [{
      loader: 'style-loader'
    }].concat(cssLoaders)

  const fileImgLoader = env === 'developent'
    ? [{
      loader: 'file-loader',
      options: {
        name: '[name]-[hash:5}.[ext]',
        outputPath: 'assets/imgs/'
      }
    }]
    : [{
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        limit: 1000,
        ontputPath: 'assets/imgs/'
      }
    }]

  const fileFontLoader = [{
    loader: 'url-loader',
    options: {
        name: '[name]-[hash:5].[ext]',
        limit: 5000,
        outputPath: 'assets/fonts/'
        // useRelativePath: true
    }
  }]

  const htmlLoader = [{
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'img:data-src']
    }
  }]

  return {
    entry: { // 入口文件
      index: './src/index.js'
    },

    output: { // 出口文件
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name]-bundle-[hash:5].js'
    },

    resolve: { // 解析本地 libs 里的第三js方库
      alias: {
        jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
      }
    },

    module: { // loader
      rules: [
        { // js
          test: /\.js$/,
          include: [path.resolve(__dirname, '../src')],
          exclude: [path.resolve(__dirname, '../src/libs')], // 第三方
          use: scriptLoader
        },
        { // css
          test: /\.scss$/,
          use: styleLoader
        },
        { // 图片
          test: /\.(png|jpg|jpeg|gif)$/,
          use: fileImgLoader.concat(
            env === 'production'
            ? { // 压缩图片
              loader: 'img-loader',
              options: {
                pngquant: 80
              }
            }
            : []
          )
        },
        { // 字体
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: fileFontLoader
        },
        {
          test: /\.html$/,
          use: htmlLoader
        }
      ]
    },

    plugins: [ // 插件
      extractSass,

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        // chunks: ['index'], // 范围
        minify: { // 压缩
          collapseWhitespace: true
        }
        // inject: false // 生成的css 和 js 不自动插入页面
      }),

      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}

module.exports = env => {
  let config = env === 'production'
    ? productionConfig
    : developmentConfig

  return merge(generateConfig(env), config)
}
