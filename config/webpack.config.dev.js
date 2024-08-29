const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: { children: false }
})

module.exports = webpackConfig
