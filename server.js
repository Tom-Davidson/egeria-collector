"use strict";

const fs = require('fs');
const Hapi = require('hapi');
const Joi = require('joi');
require('dotenv').config({silent: true});
const logger = require('./src/logger');

const server = new Hapi.Server({
  port: parseInt(process.env.PORT, 10) || 443,
  tls: {
    key: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/cert.pem', 'utf8')
  }
});

// Default route
server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request) {
      logger.debug('404, no route for ' + request.url + "\n");
      // console.log('URL: ', request.url);
      // console.log('Headers: ', request.headers);
      // console.log('Payload: ', request.payload);
      return {"error":404};
    }
});
// Status check
server.route({
  method: 'GET',
  path: '/ping',
  handler: function () {
    return {"ping":"pong"};
  }
});
// Favicon
server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: function () {
    return '';
  }
});
// https://localhost:8443/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=14&license_key=9f71a99ee183117cbf6c53677435db58804322fa&method=get_redirect_host
let commandMap = {
  'get_redirect_host': require('./src/new_relic_commands/get_redirect_host'),
  'connect': require('./src/new_relic_commands/connect'),
  'agent_settings': require('./src/new_relic_commands/agent_settings'),
  'metric_data': require('./src/new_relic_commands/metric_data'),
  'analytic_event_data': require('./src/new_relic_commands/analytic_event_data'),
  'unknown': require('./src/new_relic_commands/unknown')
};
server.route({
  method: ['POST'],
  path: '/agent_listener/invoke_raw_method',
  options: {
    validate: {
      query: {
        marshal_format: Joi.string().max(40).min(2).alphanum(),
        protocol_version: Joi.number().min(14).max(14),
        license_key: Joi.string().length(40).alphanum(),
        method: Joi.string().regex(/[a-z_]+/),
        run_id: Joi.string().length(18).alphanum().optional()
      },
    },
    handler: function (request) {
      logger.info('NR Route: ' + request.query.method + "\n");
      if(commandMap.hasOwnProperty(request.query.method)){
        return commandMap[request.query.method].exec(request);
      }else{
        return commandMap['unknown'].exec(request);
      }
    }
  }
});

server
  .start()
  .then(() => {
    logger.info('Server running at:' + server.info.uri + "\n");
  })
  .catch(err => {
    logger.error(err + "\n");
  })
module.exports = server;

// cat /dev/null > newrelic_agent.log
// cat newrelic_agent.log | grep -v segment | grep -v shimmer | grep -v tracer > newrelic_agent.txt

// eslint-disable-line no-console
