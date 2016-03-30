const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.babel');

config.output.filename = '[name].[chunkhash].js';

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
    __DEBUG__: false,
  }),
  new ExtractTextPlugin('styles.[chunkhash].css', { allChunks: true }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
  }),
]);

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss'),
  },
]);

module.exports = config;
