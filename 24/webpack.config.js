const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/foo',
    vendor: ['react']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new webpack.NamedChunksPlugin(),

    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunk: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ]
}
