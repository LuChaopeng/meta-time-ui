// 解决跨域
module.exports = {
  devServer: {
    proxy: {
      '/': {
        // 你要请求的后端接口ip+port
        target: 'http://localhost:3000',
        // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        // 开启webSocket
        ws: true,
        pathRewrite: {
          // 替换成target中的地址
          '^/': ''
        }
      }
    }
  }
}
