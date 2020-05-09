const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const apiMocker = require('mocker-api');

const rootPath = path.join(__dirname, '..');
const appPath = path.join(rootPath, 'app');

const config = {
  entry: {
    index: path.resolve(appPath, 'index.js'),
    // login: path.resolve(appPath, 'login/login.js'),
  },
  output: {
    path: path.resolve(rootPath, 'dist'), // 必须是绝对路径
    filename: 'js/[name]-[hash:6].js',
    chunkFilename: 'js/[name]-[hash:6].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.join(appPath, 'components'),
      actions: path.join(appPath, 'actions'),
      api: path.join(appPath, 'api'),
      reducers: path.join(appPath, 'reducers'),
      utils: path.join(appPath, 'utils'),
      static: path.join(appPath, 'static'),
      constants: path.join(appPath, 'constants'),
      containers: path.join(appPath, 'containers'),
      pages: path.join(appPath, 'pages'),
    },
  },
  module: {
    rules: [
      {
        test: /.html$/,
        use: 'html-withimg-loader',
        include: [appPath],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        include: [appPath],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              reloadAll: true,
              plugins: function () {
                return [
                  require('autoprefixer')()
                ]
              }
            }
          },
          'less-loader'
        ],
        include: [appPath],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K
              esModule: false, // 否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets',
            }
          }
        ],
        include: [appPath],
      }
    ]
  },
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'index.html'),
      filename: 'index.html', // 打包后的文件名
      chunks: ['index'],
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      // hash: true //是否加上hash，默认是 false
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(appPath, 'login/login.html'),
    //   filename: 'login.html', // 打包后的文件名
    //   chunks: ['login'],
    //   minify: {
    //     removeAttributeQuotes: false, // 是否删除属性的双引号
    //     collapseWhitespace: false, // 是否折叠空白
    //   },
    //   // hash: true //是否加上hash，默认是 false
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:6].css'
      //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
    }),
    new webpack.ProvidePlugin({
      React: 'react', // 配置变量
      Component: ['react', 'Component'],
      _: 'lodash',
    }),
    new CleanWebpackPlugin() // 打包时清空历史打包文件
  ],
  devServer: {
    port: '5555', // 默认是8080
    quiet: false, // 默认不启用
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", // 终端仅打印 error
    overlay: false, // 默认不启用
    clientLogLevel: "silent", // 日志等级
    compress: true, // 是否启用 gzip 压缩
    proxy: { // 代理
      '/api': {
        target: 'http://localhost:4000',
        // pathRewrite: {
        //   '/api': ''
        // }
      }
    },
    before(app) { // 前端模拟数据
      apiMocker(app, path.resolve(rootPath, 'mock/index.js'))
    },
  }
}

module.exports = {
  webpackConfig: config,
  rootPath,
  appPath,
};