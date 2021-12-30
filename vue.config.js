module.exports = {
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    hot: true,
    // 文件系统监听导致某些系统下CPU占用过高（请务必设置）
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // https://til.codes/fix-for-100-cpu-usage-by-nodejs/
    watchOptions: {
      poll: false,
      ignored: /node_modules/,
    },
  },
  publicPath: '',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  },
}
