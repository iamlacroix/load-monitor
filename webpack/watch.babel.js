const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const config = require('./config.babel');

config.watch = true;
config.cache = true;
config.debug = true;
config.devtool = 'cheap-module-eval-source-map';

config.entry.app.unshift(
  'webpack-hot-middleware/client?path=/__webpack_hmr'
);

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new WebpackNotifierPlugin(),
]);

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.css$/,
    loader: [
      'style',
      'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
      'postcss',
    ].join('!'),
  },
]);

module.exports = config;
