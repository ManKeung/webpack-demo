module.exports = {
  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].[hash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: [
          //     ['babel-preset-env', {
          //       targets: {
          //         browsers: ['> 1%', 'last 2 versions'] // 支持的浏览器
          //       }
          //     }]
          //   ]
          // }
        },
        exclude: '/node_modules/' // 排除规则之外
      }
    ]
  }
}
