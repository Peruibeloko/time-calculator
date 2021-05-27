module.exports = {
  lintOnSave: false,
  publicPath: '',
  outputDir: 'docs',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Time Calculator'
        return args
      })
  }
};
