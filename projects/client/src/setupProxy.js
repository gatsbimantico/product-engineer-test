const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/socket.io', { target: 'http://localhost:3001/' }));
  app.use(proxy('/sockjs-node', { target: 'ws://localhost:3001/' }));
};
