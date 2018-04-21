const webpack = require('webpack')
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')

module.exports = {
  // devtool: 'eval', // js 调试 速度非常快
  // devtool: 'source-map', // js 调试 线上
  devtool: 'cheap-module-source-map', // js 调试 开发可选择 有点损耗开发性能（刚开始比较慢）

  devServer: {
    // inline: false, // 页面里显示打包状态
    port: 9001, // 端口
    overlay: true, // 浏览器代码错误提示
    proxy: proxy, // 接口
    hot: true,
    hotOnly: true,
    historyApiFallback: historyFallback
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ]
}
