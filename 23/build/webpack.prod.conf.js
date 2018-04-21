const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')
const glob = require('glob-all')

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../src/dll/ui-manifest.json')
    }),

    new webpack.DllReferencePlugin({
      manifest: require('../src/dll/vue-manifest.json')
    }),

    new UglifyJsPlugin({
      parallel: true,
      cache: true
    })

    new PurifyCSS({
      paths: glob.sync([
        './*html',
        './src/*.js'
      ])
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CleanWebpackPlugin(['dist'])
  ]
}
