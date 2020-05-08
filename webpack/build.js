const { webpackConfig, rootPath, appPath } = require('./common');
const webpack = require('webpack');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

webpackConfig.mode = 'production';

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env": { 
       NODE_ENV: JSON.stringify("production") 
     }
  }),
  new OptimizeCssPlugin(), // 压缩css，开发环境不需要
)
module.exports = webpackConfig;