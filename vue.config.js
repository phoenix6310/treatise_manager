'use strict'
const path = require('path')

function resolve(dir) {
 return path.join(__dirname, dir)
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
 publicPath: process.env.VUE_APP_PUBLIC_PATH,
 devServer: {
  disableHostCheck: true,
  open: true,
  port: 9527,
  host: '172.18.84.35',
  proxy: {
   'api': {
    target: 'http://172.18.84.42:7006',
    pathRewrite: {
     '^/api': '',
     changeOrigin: true
    }
   }
  }
 },
 productionSourceMap: false,
 configureWebpack: {
  // provide the app's title in webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  name: '答辩',
  resolve: {
   alias: {
    '@': resolve('src'),
   }
  },
  plugins: [
   new UglifyJsPlugin({
    uglifyOptions: {
     compress: {
      drop_console: true,
     },
    },
   }),
  ],
 },
}