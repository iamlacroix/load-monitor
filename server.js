/* eslint no-console: 0 */

const server = require('./src/server');

server.start(() => {
  console.info(`==> Application started on ${server.info.uri.toLowerCase()}`);
});
