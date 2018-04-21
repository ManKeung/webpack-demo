[TOC]

# [webpack](https://github.com/webpack/webpack/releases)

## 核心概念

### Entry

+ 代码入口 打包入口 单个或多个

```
module.exports = {
  // entry: 'index.js' // 方式1
  // entry: ['index.js', 'vendor.js'] // 方式2
  entry: {
    index: './index.js' // 方式3 建议
  }
}
```

### Output

+ 打包文件输出 一个或多个 自定义规则

```
module.exports = {
  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].min.[hash:5].js'
  }
}
```

### Loaders

+ 处理文件 转化为模块
+ 编译相关 babel-loader、ts-loader
+ 样式相关 style-loader、css-loader、less-loader、postcss-loader
+ 文件相关 file-loader、url-loader

```
module.exports = {
  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].min.[hash:5].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/, // 正则
        use: 'css-loader' // 用相应的loader
      }
    ]
  }
}
```

### Plugins

+ 参与打包整个过程 打包优化和压缩 配置编译时的变量 极其灵活
+ 优化相关 CommonsChunkPlugin UglifyjsWebpackPlugin
+ 功能相关 ExtractTextWebpackPlugin HtmlWebpackPlugin HotModuleReplacementPlugin CopyWebpackPlugin

```
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].min.[hash:5].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/, // 正则
        use: 'css-loader' // 用相应的loader
      }
    ]
  },

  pugins: [
    new webpack.otimize.UglifyJsPlugin()
  ]
}
```

### 模块引入

1. esmodule
import sum from './sum'

```
// sum
export default function(a, b) {
  return a + b;
}

console.log('sum(23, 24) = ', sum(23, 24))
```

2. commonjs
const minus = require('./minus')

```
// minus
module.exports = function(a, b) {
  return a - b;
}

console.log('minus(23, 17) = ', minus(23, 17))
```

3. amd
require(['./muti'], function(muti) {
  console.log('muti(2, 3) = ', muti(2, 3))
})

```
// muti
define(function(require, factory) {
  'use strict';
  return function(a, b) {
    return a * b;
  }
});
```
## 编译ES6/7 【01】

### 依赖安装

+ $ npm i babel-loader babel-core babel-preset-env babel-plugin-transform-runtime -D
+ $ npm i babel-runtime -S

1. Babel
  + Babel-loader babeljs.io
  + $ npm install babel-loader@8.0.0-beta.0 @babel/core
  + $ npm install --save-dev babel-loader babel-core

2. Babel-presets
  + es2015
  + es2016
  + es2017
  + env
  + babel-preset-react
  + babel-preset-stage 0-3
  + $ npm install @babel/preset-env --save-dev
  + $ npm install babel-preset-env --save-dev

  targets
    - targets.browsers
    - targets.browsers: "last 2 versions"
    - targets.browsers: "> 1%"
  browserlist
  Can I use

3. Babel-plugin

4. Babel Polyfill
  + 全局垫片
  + 为应用准备
  + $ npm install babel-polyfill --save
  + import "babel-polyfill"

5. Babel Runtime Transform
  + 局部垫片
  + 为开发框架准备
  + $ npm install babel-plugin-transform-runtime --save-dev
  + $ npm install babel-runtime --save
  + .babelrc

+ 注意：不要垫片可以不安装 babel-plugin-transform-runtime babel-runtime

```
// .babelrc
{
  "presets": [
    ["babel-preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "> 1%"]
      }
    }]
  ]
}

```

## 提取公用代码 【02】

减少代码冗余
提高加载速度

+ 场景
  - 单页应用
  - 单页应用 + 第三方依赖
  - 多页应用 + 第三方依赖 + webpack生成代码

### 依赖安装

+ $ npm i webpack@3.10.0 -D
+ $ npm i lodash -S // 引入第三方插件

## 代码分割和懒加载 【03】

### 依赖安装

+ $ npm i webpack@3.10.0 -D
+ $ npm i lodash -S // 引入第三方插件

## 处理CSS 【04】

+ 引入
  - style-loader
    * style-loader
    * style-loader/url
    * style-loader/useable
    * options
      = insertAt(插入位置)
      = insertInto(插入到dom)
      = singleton(是否只使用一个style标签)
      = transform(转化，浏览器环境下，插入页面前)
  - css-loader
    * options
      = alias(解析的别名)
      = importLoader(@import)
      = Minimize(是否压缩)
      = modules (启用css-modules)

### 依赖安装

+ $ npm i css-loader file-loader style-loader -D

## CSS + SASS 【05】

+ 配置less / sass
  - $ npm install less-loader less  --save-dev
  - $ npm install sass-loader node-sass --save-dev

### 依赖安装

+ $ npm i css-loader node-sass sass-loader style-loader -D

## 提取css 【06】

### 依赖安装

+ $ npm i css-loader node-sass sass-loader style-loader extract-text-webpack-plugin webpack@3.10.0 -D

## css处理PostCSsS 【07】

### 依赖安装

+ $ npm i css-loader node-sass sass-loader style-loader extract-text-webpack-plugin webpack@3.10.0 postcss postcss-loader autoprefixer cssnano postcss-cssnext -D

## Tree shaking

+ 使用场景
  - 常规化
  - 引入第三方库的某些功能

### JS Tree Shaking 【08】

+ JS Tree Shaking
  - Webpack.optimize.uglifyJS
  - Lodash Tree shaking
    * Not working
    * lodash-es Not working
    * Babel-plugin-lodash working

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 -D
+ $ npm i lodash -S

### CSS Tree Shaking 【09】

+ CSS Tree Shaking
  - Purify CSS
  - https://github.com/purifycss/purifycss
  - purifycss-webpack
  - Purify CSS
    * options
      paths: glob.sync([])
      npm install glob-all  --save-dev

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all -D

## 文件处理

### 图片处理 【10】

+ css中引入图片
+ 自动合成雪碧图
+ 压缩图片
+ Base64编码

1. file-loader
2. url-loader
3. img-loader
4. postcss-sprites

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader -D

### 字体文件 【11】

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader -D


## 第三方JS库 【12】

1. webpack.providePlugin
2. imports-loader
3. window

### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader -D

## HTML inWebpack

自动生成HTML
场景优化

### 生成HTML 【13】

+ htmlWebpackPlugin
+ options
  - template
  - filename
  - minify
  - chunks
  - inject

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin -D

### HTML中移入图片 【14】

+ html-loader
+ options
  - attrs: [img: src]

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader -D

## 配合优化 【15】

+ 提前载入webpack加载代码
  - inline-manifest-webpack-plugin
  - html-webpack-inline-chunk-plugin

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin -D

## 搭建开发环境

### webpck watch mode 【16】

+ $ webpack -watch
+ $ webpack -w
+ $ npm i clean-webpack-plugin -D // 打包前不保留之前打包文件

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin -D

+ 执行监听命令：
  - $ webpack -w --progress --display-reasons --color

### webpack-dev-server 【17】

+ live reloding // 刷新浏览器
+ 打包文件?No
+ 路径重定向
+ https
+ 浏览器中显示编译错误
+ 接口代理
+ 模块热更新

1. devServer
  + inline
  + contentBase
  + port
  + historyApiFallback
  + https
  + proxy
    - 代理远程接口请求
    - http-proxy-middleware
      * options
        - target // 代理地址
        - changeOrigin // 重要 默认false
        - headers // http请求头
        - logLevel // 调试
        - pathRewrite // 重定向接口请求
    - devServer.proxy
  + hot
  + openpage
  + lazy
  + overlay

+ $ npm i webpack-dev-server -D

+ Module Hot Reloading // 模块热更新
  - 保持应用的数据状态
  - 节省调试时间
  - 样式调试更快
  - devServer.hot
  - webpack.HotModuleReplacementPlugin
  - webpack.NamedModulesPlugin
  - module.hot
  - module.hot.accept
  - module.hot.decline

#### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin webpack-dev-server@2.9.7 -D

## Source Map 调试 【18】

+ Devtool
  - Development
    * eval
    * eval-source-map
    * cheap-eval-source-map
    * cheap-module-eval-source-map

  - Production
    * source-map
    * hidden-source-map
    * nosource-source-map

+ webpack.SourceMapDevToolPlugin
+ webpack.EvalSourceMapDevToolPlugin

1. JS Source Map

2. CSS Source Map
  + css-loader.option.sourcemap
  + less-loader.option.sourcemap
  + sass-loader.option.sourcemap

### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin webpack-dev-server@2.9.7 -D

## EsLint检查代码格式 【19】

+ Devtool
  - Development
    * eval
    * eval-source-map
    * cheap-eval-source-map
    * cheap-module-eval-source-map

  - Production
    * source-map
    * hidden-source-map
    * nosource-source-map

+ webpack.SourceMapDevToolPlugin
+ webpack.EvalSourceMapDevToolPlugin

1. JS Source Map

2. CSS Source Map
  + css-loader.option.sourcemap
  + less-loader.option.sourcemap
  + sass-loader.option.sourcemap

### EsLint检查代码格式

+ Jaascript Standard Style(https://standardjs.com/ 'JS规范集合')

1. 需要安装
  + eslint
  + eslint-loader
    - options.failOnWarning
    - options.failOnError
    - options.formatter
    - options.outputReport
  + eslint-plugin-html
  + eslint-friendly-formatter

2. 配置ESLint
  + webpack config
  + .eslintrc.*
  + package.json中的eslintConfig
  + eslint-config-standard
  + eslint-plugin-promise
  + eslint-plugin-standard
  + eslint-plugin-import
  + eslint-plugin-node
  + eslint-config-xxx

+ npm i eslint eslint-loader eslint-plugin-html eslint-friendly-formatter -D

+ npm i eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard -D

### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin webpack-dev-server@2.9.7 eslint eslint-loader eslint-plugin-html eslint-friendly-formatter eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard -D

## 开发环境和生产环境 【20】

1. 开发环境
  + 模块热更新
  + sourceMap
  + 接口代理
  + 代码规范检测

2. 生产环境
  + 提取公用代码
  + 压缩混淆
  + 文件压缩或是Base64编码
  + 去除无用的代码

3. 共同点
  + 同样入口
  + 同样的代码处理（loader处理）
  + 同样的解析配置

4. 如何做？
  - webpack-merge
  - webpack.dev.conf.js
  - webpack.prod.conf.js
  - webpack.common.conf.js

+ npm i webpack-merge -D

### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin webpack-dev-server@2.9.7 eslint eslint-loader eslint-plugin-html eslint-friendly-formatter eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard webpack-merge -D

## express + webpack-dev-middleware 【21】

+ Express or Koa
+ webpack-dev-middleware
+ webpack-hot-middleware
+ http-proxy-middleware
+ connect-history-api-fallback
+ opn

### 依赖安装

+ $ npm i babel-core babel-loader babel-preset-env css-loader node-sass sass-loader extract-text-webpack-plugin webpack@3.10.0 purifycss-webpack purify-css glob-all file-loader url-loader img-loader postcss-sprites postcss-loader imports-loader html-webpack-plugin html-loader html-webpack-inline-chunk-plugin clean-webpack-plugin webpack-dev-server@2.9.7 eslint eslint-loader eslint-plugin-html eslint-friendly-formatter eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard webpack-merge express opn webpack-dev-middleware webpack-hot-middleware http-proxy-middleware connect-history-api-fallback -D


## 打包结果分析 【22】

### Offical Analyse Tool

+ webpack --profile --json > stats.json // MAX
+ webpack --profile --json | Out-file 'stats.json' -EncodingOEM // WIND

1. [analyse]('http://webpack.github.io/analyse/')
2. [webpck-chart]('https://alexkuz.github.io/webpack-chart/')
3. [webpck-chart]('https://alexkuz.github.io/stellar-webpack/')

### webpack-bundle-analyzer

1. 插件 BundleAnalyzerPlugin
2. 命令行 webpack-bundle-analyzer stats.json

+ npm i webpack-bundle-analyzer -D

## 打包速度优化 【23】

1. 文件多
2. 依赖多
1. 页面多

### 办法

1. 分开vendor和app
  + Dllplugin
  + DllReferencePlugin

2. UglifyJsPlugin
  + parallel
  + cache

3. HappyPack HappyPack.ThreadPool
  + $ npm i happypack -D

4. babel-loader
  + options.cacheDirectory
  + include
  + exclude

5. 减少 resolve Devtool: 去除sourcemap cache-loader 升级node 升级webpack

## 长缓存优化 【24】

## 多页面开发

多入口entry
多页面html
多个页面不同的chunk
每个页面不同的参数

### 方法

1. 多配置 【25】
  webpack 3.1.0
  parallel-webpack
    + parallel-webpack --watch
    + parallel-webpack --config

  + 优点
    - 可以使用parallel-webpack来提高打包的速度
    - 配置更加独立，灵活
  + 缺点
    - 不能多页面之间共享代码

  + $ npm i webpack-merge webpack@3.10.0 html-webpack-plugin clean-webpack-plugin extract-text-webpack-plugin style-loader css-loader parallel-webpack -D


2. 单配置

  + 优点
    - 可以共享各个entry之间的公用代码
  + 缺点
    - 打包速度比较慢
    - 输出的内容比较复杂
