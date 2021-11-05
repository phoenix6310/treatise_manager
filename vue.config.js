'use strict'
const path = require('path')
const NODE_ENV = process.env.NODE_ENV
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let prodPlugins = []
if (NODE_ENV === 'production') {
  // 去掉console
  prodPlugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true,
      },
    },
  }))
}

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    disableHostCheck: true,
    open: true,
    port: 9527,
    host: '192.168.0.105',
    host: '172.18.84.35',
    proxy: {
      'treatise_manager': {
        // target: 'http://172.18.84.42:7006',
        target: 'http://172.18.84.81:7006',
        // target: 'http://f3176v6414.zicp.vip',
        target: 'http://4s455471z1.qicp.vip',
        // target: 'http://scc.apabi.cn/',
        pathRewrite: {
          '^/treatise_manager': '',
          changeOrigin: true
        },
        // headers: {
        //     Host: 'f3176v6414.zicp.vip'
        // }
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '答辩平台管理端',
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins: [
      ...prodPlugins,
    ],
  },
  outputDir: 'E:\\pengjie20190321\\project\\OnlineCourseWeb\\dist\\db_manager'
}