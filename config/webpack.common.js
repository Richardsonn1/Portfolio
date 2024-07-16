const path = require('path')
const autoprefixer = require('autoprefixer')
const { EnvironmentPlugin } = require('webpack')
const webpack = require('webpack')

const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(__dirname, '../src')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
  // Tell webpack where to start the bundling process
  entry: {
    app: srcPath + '/index.tsx'
  },

  // Output to dist/
  output: {
    filename: '[name].[fullhash:8].js',
    path: rootPath + '/dist',
    publicPath: '/'
  },

  resolve: {
    // Search for modules in src and node_modules
    // This enables absolute imports for files under src
    modules: [srcPath, 'node_modules'],
    // So you don't have to specify the file extension when importing
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs']
  },

  // Note: Do not use optimization in dev
  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'all'
    }
  },
  // The performance hints are not really applicable for us as we're
  // not making a public website. It mostly complains about file sizes.
  // https://webpack.js.org/configuration/performance/
  performance: {
    hints: false
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      // https://github.com/TypeStrong/ts-loader
      { test: /\.ts(x?)$/, exclude: /node_modules/, loader: 'ts-loader' },
      { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' },

      // Polyfills
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/, /build/, /__tests__/, /__mocks__/]
      },

      // SASS files are transformed by many loaders
      // Loaders run from bottom to top (sass-resources-loader => ... => style-loader)
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
              banner: '// This file is generated automatically'
            }
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[fullhash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly'
              }
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer()]
              }
            }
          },
          {
            loader: require.resolve('sass-loader')
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [srcPath + '/variables.scss', srcPath + '/utils.scss']
            }
          }
        ]
      },

      // A webpack loader which loads SVG file as utf-8 encoded DataUrl string.
      // https://github.com/bhovhannes/svg-url-loader
      // https://github.com/babel/babel-loader
      {
        test: /\.svg$/,
        use: [
          'svg-url-loader',
        ],
        type: 'javascript/auto',
      },
      // Allows us to import images.
      {
        test: /\.(png|bmp|jp(e*)g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      },
      // Allows us to load external fonts.
      {
        test: /\.(woff|woff2|ttf)$/,
        dependency: { not: ['url'] },
        type: 'asset/resource'
      },
      // Allows external css files.
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]
}

