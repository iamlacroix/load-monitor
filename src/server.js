const os = require('os');
const path = require('path');
const Hapi = require('hapi');
const H2o2 = require('h2o2');
const Inert = require('inert');
const Good = require('good');
const GoodConsole = require('good-console');

const PRODUCTION = process.env.NODE_ENV === 'production';

const server = new Hapi.Server();
server.connection({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  address: '0.0.0.0',
});

const logOptions = {
  reporters: [{
    reporter: GoodConsole,
    events: { log: '*', response: '*' },
    config: { format: 'MMDD/hh:mmA/ss.SSS' },
  }],
};

const setup = PRODUCTION ? () => {
  // Production routes

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.file('dist/index.html'),
  });

  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: (request, reply) => reply.file(`dist${request.path}`),
  });

  server.ext('onPreResponse', (request, reply) => {
    const response = request.response;

    // If a file wasn't found, render the client app instead.
    if (request.method === 'get' && response.isBoom && response.output.statusCode === 404) {
      return reply.file('dist/index.html');
    }

    return reply.continue();
  });
} : () => {
  // Development routes

  const webpack = require('webpack');
  const WebpackPlugin = require('hapi-webpack-plugin');
  const webpackConfig = require('../webpack/watch.babel');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddlewareOptions = {
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      colors: true,
      chunks: false,
    },
  };

  // Register webpack-dev-middleware and webpack-hot-middleware
  server.register({
    register: WebpackPlugin,
    options: { compiler, assets: webpackDevMiddlewareOptions, hot: {} },
  }, (err) => {
    if (err) throw err;
  });


  server.ext('onPreResponse', (request, reply) => {
    // Only use this for GET methods that are 404 errors
    const resp = request.response;
    if (!(request.method === 'get' && resp.isBoom && resp.output.statusCode === 404)) {
      return reply.continue();
    }

    const filename = path.join(compiler.outputPath, '..', 'index.html');

    return compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return reply.continue();
      }

      return reply(result).type('text/html');
    });
  });
};

server.register([
  H2o2,
  Inert,
  { register: Good, options: logOptions },
], (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/load',
    handler(request, reply) {
      const loadAvgs = os.loadavg();

      reply({
        // 1 minute average
        avg1Min: loadAvgs[0],
        // 5 minute average
        avg5Min: loadAvgs[1],
        // 15 minute average
        avg15Min: loadAvgs[2],
        // Mark the time it was recorded
        recordedAt: Date.now(),
      });
    },
  });

  setup();
});

module.exports = server;
