const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoaderConfig = {
  presets: ['latest', 'stage-0', 'react'],
  plugins: [['import', {libraryName: 'antd', style: true}]],
  cacheDirectory: true,
};

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './src/index.js',
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js',
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?' + JSON.stringify(babelLoaderConfig)],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        loader: 'style!css!less?{"sourceMap":true}',
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {warnings: false},
      output: {comments: false},
    }),

    new HtmlWebpackPlugin({
      template: 'index.html.template',
      minify: {removeComments: true, collapseWhitespace: true},
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    }),
  ],
};
