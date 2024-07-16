const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(__dirname, '../src')

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// This plugin removes the contents of a folder before building
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// This plugin takes an HTML file as template and adds the generated bundle
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = {
  mode: 'production',

  // Configuration shared by several configs
  entry: common.entry,
  module: common.module,
  resolve: common.resolve,
  optimization: common.optimization,
  performance: common.performance,

  output: {
    filename: common.output.filename,
    path: rootPath + '/stats',
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      reportFilename: 'stats-report.html',
      statsFilename: 'stats.json',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: srcPath + '/public/index.html',
      favicon: srcPath + '/public/images/favicon.ico',
    }),
  ],
}
