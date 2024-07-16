const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.resolve(__dirname, '../src')
const common = require('./webpack.common.js')

module.exports = {
  mode: 'development',

  // Configuration shared by several configs
  entry: common.entry,
  module: common.module,
  resolve: common.resolve,
  performance: common.performance,

  // Override filename for dev (avoids path issues)
  output: Object.assign(common.output, { filename: '[name]-[hash:8].js' }),

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    // https://webpack.js.org/configuration/dev-server/

   // Serve files from dist
   static: {
    directory: path.resolve('../dist')
  },

  // Enable Hot Module Replacement (live reload)
  hot: true,

  // Show errors full screen in the browser
  client: {
    overlay: true,
    progress: true
  },

  port: 3050,

  // Setting host to 0.0.0.0 makes the server public
  host: '0.0.0.0',

  // Serve index.html on 404 (see docs for detail)
  historyApiFallback: true,

  allowedHosts: 'all'
},

plugins: [
  ...common.plugins,
  new HtmlWebpackPlugin({
    template: srcPath + '/public/index.html',
      favicon: srcPath + '/public/images/favicon.ico',
  }),
  new webpack.HotModuleReplacementPlugin(),
],
}