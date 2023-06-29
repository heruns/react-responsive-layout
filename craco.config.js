const path = require('path')

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        // 全局添加 scss 前缀代码，自动引入 function.scss
        // 关于 additionalData: https://github.com/webpack-contrib/sass-loader#additionaldata
        additionalData: (content, loaderContext) => {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
            .split(path.sep)
            .join('/')
          const filesToImport = ['src/styles/function.scss']

          if (/\.scss$/.test(relativePath) && !filesToImport.includes(relativePath)) {
            const importStatements = filesToImport
              .map(file => `@import "${file.replace('src', '@')}";`)
              .join('\n')
            return `${importStatements}\n${content}`
          } else {
            return content
          }
        },
      }
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // 配置 src 目录别名
      webpackConfig.resolve = webpackConfig.resolve || {}
      webpackConfig.resolve.alias = webpackConfig.resolve.alias || {}
      webpackConfig.resolve.alias['@'] = path.resolve(__dirname, 'src')
      return webpackConfig
    }
  }
}
