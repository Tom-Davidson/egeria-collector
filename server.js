"use strict";

require('newrelic');
const Hapi = require('hapi'),
       Joi = require('joi'),
        fs = require('fs');
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
// https://localhost:8443/agent_listener/1.0/lic/meth?run_id=8wfynw8o4yv&marshal_format=json
server.route({
  method: ['GET', 'PUT', 'POST'],
  path: '/agent_listener/{protocol}/{licenceKey}/{method}',
  config: {
    validate: {
      params: {
        protocol: Joi.string().regex(/[0-9]{1,2}\.[0-9]{1,2}/),
        licenceKey: Joi.string().max(40).min(2).alphanum(),
        method: Joi.string().max(40).min(2).alphanum()
      },
      query: {
        run_id: Joi.string().max(40).min(2).alphanum(),
        marshal_format: Joi.string().max(40).min(2).alphanum()
      }
    },
    handler: function (request, reply) {
      console.log('Request for /agent_listener');
      return reply(
        {
          "protocol":       request.params.protocol,
          "licenceKey":     request.params.licenceKey,
          "method":         request.params.method,
          "run_id":         request.query.run_id,
          "marshal_format": request.query.marshal_format
        }
      );
    }
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
        method: Joi.string().regex(/[a-z\_]+/)
      },
    },
    handler: function (request, reply) {
      switch(request.query.method){
        case 'get_redirect_host':
          const command = require('./src/new_relic_commands/get_redirect_host');
          return reply(command.exec());
          break;
        default:
          console.log("Unknown method '" + request.query.method + "' in POST to /agent_listener/invoke_raw_method");
          return reply({
            error: "Unknown method"
          });
          break;
      }
    }
  }
});
// Default route
server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, reply) {
      console.log('404');
      reply({"error":404});
    }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
module.exports = server;
