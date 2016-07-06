"use strict";

require('newrelic');
const Hapi = require('hapi');
const fs = require('fs');
require('dotenv').config({silent: true});

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 443,
  tls: {
    key: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/cert.pem', 'utf8')
  }
});
server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, reply) {
    return reply({"ping":"pong"});
  }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
module.exports = server;
