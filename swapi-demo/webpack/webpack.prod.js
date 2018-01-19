const webpack = require('webpack');
const config = require('./webpack.base.js');

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
]);

module.exports = config;
