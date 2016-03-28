const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.babel');

const Confidence = require('confidence');
const configDocument = require('../src/web/config');
const appConfig = new Confidence.Store(configDocument);

const assetsUrl = appConfig.get('/assets/url', { env: process.env.NODE_ENV || 'production' });
const publicPath = appConfig.get('/assets/publicPath', { env: process.env.NODE_ENV || 'production' });

config.output.publicPath = `${assetsUrl}${publicPath}`;
config.output.filename = '[name].[chunkhash].js';

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
    __DEBUG__: false,
  }),
  new WebpackIsomorphicToolsPlugin(require('./isomorphic')).development(false),
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
