const hapi = require('hapi');
const swagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');

const config = require("./config");
const routes = require('./routes');
const logger = require('./logger');

const server = new hapi.Server();

server.connection({port: config.port});

server.route(routes);

server.register([inert, vision, swagger], (err) => {
  if (err) {
    logger.error(err);
  }
});

server.ext('onRequest', (request, reply) => {
  logger.info({
    id : request.id,
    method : request.method,
    path : request.path
  });
  reply.continue();
});

server.ext('onPreResponse', (request, reply) => {
  logger.info({
    statusCode : request.response.statusCode,
    id : request.id,
  });
  reply.continue();
});

server.start(function (err) {
  if (err) throw err;
  logger.info('server listening on port ' + config.port);
});

module.exports = server;
