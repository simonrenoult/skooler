const hapi = require('hapi');
const swagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');
const joi = require('joi');

const routes = require('./routes');

const server = new hapi.Server();

server.connection({port: 3000});
server.route(routes);
server.register([inert, vision, swagger], (err) => {
  if (err) {
    console.log(err);
  }
});

server.start(function (err) {
  if (err) throw err;
  console.log('server listening on port 3000');
});

module.exports = server;
