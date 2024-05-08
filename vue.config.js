const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const port=8888
module.exports = {
  lintOnSave: false,
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].COMMIT_HASH = JSON.stringify(gitRevisionPlugin.commithash())
      args[0]['process.env'].BRANCH = JSON.stringify(gitRevisionPlugin.branch())
      args[0]['process.env'].VERSION= JSON.stringify(gitRevisionPlugin.version())
      args[0]['process.env'].LASTCOMMITDATETIME= JSON.stringify(gitRevisionPlugin.lastcommitdatetime())
      return args
    })
  }
}
