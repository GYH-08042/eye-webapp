const { defineConfig } = require('@vue/cli-service')
const path = require("path");
//配置修改VantUI组件默认样式的less文件路径
const myTheme = path.resolve(__dirname, "./src/assets/less/vantChange.less");
module.exports = defineConfig({
  publicPath: './',//修正打包时的错误路径引用
  transpileDependencies: true,
  //引入vantUI组件默认样式配置
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${myTheme}";`
          }
        }
      }
    }
  },
  devServer: {
    host: '192.168.1.3',
    //跨域
    proxy: {
      '/api': {
        target: 'http://192.168.1.3:28019',//后端接口域名
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^/api': ''//重写api
        }
      }
    },
    //websocket
    client: {
      webSocketURL: 'ws://192.168.1.3:8080/ws'
    }
  }
})
