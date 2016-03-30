/* eslint no-console: 0 */

const webpack = require('webpack');
const webpackConfig = require('./webpack/config.babel');

module.exports = function KarmaConf(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['tap'],

    files: ['tests.webpack.js'],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: webpackConfig.module.loaders.concat([
          {
            test: /\.css$/,
            loader: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
              'postcss',
            ].join('!'),
          },
        ]),
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
      node: {
        fs: 'empty',
      },
      externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    },

    webpackServer: {
      noInfo: true,
    },

  });
};
