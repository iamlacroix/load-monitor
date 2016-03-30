const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  cache: false,
  context: path.join(__dirname, '..'),
  devtool: false,

  entry: {
    app: ['./src/client'],
  },

  output: {
    path: path.resolve('./dist/_bundle'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: '/_bundle',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Load Monitor',
      filename: '../index.html',
      template: 'src/index.html',
    }),
  ],

  module: {
    loaders: [
      { test: /\.(png|jpe?g|gif)$/, loader: 'url?limit=10000' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-decorators-legacy'],
      },
 },
    ],
  },

  postcss: function postcss() {
    return [
      require('postcss-import')(),
      require('postcss-cssnext')(),
      require('lost')({
        flexbox: 'flex',
        gutter: '2rem',
      }),
      require('postcss-reporter')({ clearMessages: true }),
    ];
  },
};
