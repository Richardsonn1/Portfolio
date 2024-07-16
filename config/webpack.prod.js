const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// This plugin removes the contents of a folder before building
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.common.js')
const srcPath = path.resolve(__dirname, '../src')

module.exports = {
  mode: 'production',

  // Configuration shared by several configs
  entry: common.entry,
  output: common.output,
  module: common.module,
  resolve: common.resolve,
  optimization: common.optimization,
  performance: common.performance,

  plugins: [
    ...common.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: srcPath + '/public/index.html',
      favicon: srcPath + '/public/images/favicon.ico',
      minify: { removeComments: true },
    }),
  ],
}
