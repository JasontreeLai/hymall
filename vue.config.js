'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: { // 配置路径别名
        //设置 src 的别名为 @
        '@': resolve('src'),

        'assets': '@/assets',
        'commonjs': '@/commonjs',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store':'@/store'
      }
    }
  }
}