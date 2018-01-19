const webpack = require('webpack');

const config = require('./webpack.base.js');

config.devtool = 'inline-sourcemap';

config.devServer = {
  colors: true,
  progress: true,
  hot: true,
  open: true,
  'history-api-fallback': true,
};

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
]);

module.exports = config;
