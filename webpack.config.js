const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoaderConfig = {
  presets: ['latest', 'stage-0', 'react'],  // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
  plugins: [['import', {libraryName: 'antd', style: true}]],  // antd模块化加载, https://github.com/ant-design/babel-plugin-import
  cacheDirectory: true,
};

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'babel-polyfill',
    './src/index.js',
  ],

  output: {  // 输出的目录和文件名
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [  // 定义各种loader
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?' + JSON.stringify(babelLoaderConfig)],  // react-hot-loader可以不用刷新页面, 如果用普通的dev-server的话会自动刷新页面
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        loader: 'style!css!less?{"sourceMap":true}',
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',  // 图片小于一定值的话转成base64
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),  // magic globals, 用于打印一些调试的日志, webpack -p时会删除
    }),
    // 生成html文件
    new HtmlWebpackPlugin({
      template: 'index.html.template',
    }),
  ],
};
