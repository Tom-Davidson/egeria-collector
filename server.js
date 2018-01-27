"use strict";

require('newrelic');
const fs = require('fs');
const Hapi = require('hapi');
const Joi = require('joi');
require('dotenv').config({silent: true});

const server = new Hapi.Server();
try{
  server.connection({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 443,
    tls: {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf8')
    }
  });
  process.stdout.write("Found ssl certificates, starting as https\n");
}catch(e){
  server.connection({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 80,
  });
}

// Default route
server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, reply) {
      process.stdout.write("404\n");
      reply({"error":404});
    }
});
// Status check
server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, reply) {
    return reply({"ping":"pong"});
  }
});
// https://localhost:8443/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=14&license_key=9f71a99ee183117cbf6c53677435db58804322fa&method=get_redirect_host
server.route({
  method: ['POST'],
  path: '/agent_listener/invoke_raw_method',
  config: {
    validate: {
      query: {
        marshal_format: Joi.string().max(40).min(2).alphanum(),
        protocol_version: Joi.number().min(14).max(14),
        license_key: Joi.string().length(40).alphanum(),
        method: Joi.string().regex(/[a-z\_]+/),
        run_id: Joi.string().length(18).alphanum().optional()
      },
    },
    handler: function (request, reply) {
      let command = { exec: function() {} }
      switch(request.query.method){
        case 'get_redirect_host':
          command = require('./src/new_relic_commands/get_redirect_host');
          return reply(command.exec());
          // break;
        case 'connect':
          command = require('./src/new_relic_commands/connect');
          return reply(command.exec(request.payload[0]));
          // break;
        case 'agent_settings':
          command = require('./src/new_relic_commands/agent_settings');
          return reply(command.exec(request.query.license_key));
          // break;
        case 'metric_data':
          command = require('./src/new_relic_commands/metric_data');
          return reply(command.exec());
          // break;
        case 'analytic_event_data':
          command = require('./src/new_relic_commands/analytic_event_data');
          return reply(command.exec());
          // break;
        default:
          command = require('./src/new_relic_commands/unknown');
          return reply(command.exec(request.query.method));
          // break;
      }
    }
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  process.stdout.write('Server running at:' + server.info.uri + "\n");
});
module.exports = server;
