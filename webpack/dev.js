const { webpackConfig, rootPath, appPath } = require('./common');
const webpack = require('webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

webpackConfig.devtool = 'source-map';
webpackConfig.mode = 'development';

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('dev'),
    },
  }),
)


module.exports = smp.wrap(webpackConfig);