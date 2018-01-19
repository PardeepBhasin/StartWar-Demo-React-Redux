const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const loaders = [
  {
    loader: "css-loader" ,
    options: { minimize: true }
  }, {
    loader: "sass-loader"
  }
];

module.exports = {
  entry: {  
    bundle : './src/app.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux-logger',
      'redux-thunk',
      'isomorphic-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, '../', 'public/'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loaders,
        }),
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
           fallback: "style-loader",
           use: "css-loader"
        })
     }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new ExtractTextPlugin( {
      filename: "styles.css"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false}
    }),
    new CompressionPlugin({
      cache: true,
      test: /\.js$|\.css$|\.html$|\.svg$/,
      threshold: 0,
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    })
  ],
};
