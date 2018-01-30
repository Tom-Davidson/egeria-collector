"use strict";

require('newrelic');
const Hapi = require('hapi');

const server = new Hapi.Server({
  port: 3000
});

// Default route
server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, h) {
      process.stdout.write("404\n");
      console.log('URL: ', request.url);
      console.log('Headers: ', request.headers);
      console.log('Payload: ', request.payload);
      return {"error":404};
    }
});
// Status check
server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, h) {
    return {"ping":"pong"};
  }
});
// Favicon
server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: function (request, h) {
    return '';
  }
});

server
  .start()
  .then(() => {
    process.stdout.write('Server running at:' + server.info.uri + "\n");
  })
  .catch(err => {
    process.stdout.write(err + "\n");
  })
module.exports = server;
