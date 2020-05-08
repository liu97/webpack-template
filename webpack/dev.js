const { webpackConfig, rootPath, appPath } = require('./common');
const webpack = require('webpack');

webpackConfig.devtool = 'source-map';
webpackConfig.mode = 'development';

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('dev'),
    },
  }),
)


module.exports = webpackConfig;