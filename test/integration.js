var Lab = require("lab");             // lab testing framework
var lab = exports.lab = Lab.script(); // export test script
var Code = require("code");           // assertion library
var server = require("../server.js"); // our app

lab.experiment("Basic HTTP Tests", function() {
  lab.test("GET /ping", function(done) {
      const options = {
          method: "GET",
          url: "/ping"
      };
      server.inject(options, function(response) {
          Code.expect(response.statusCode).to.equal(200);
          Code.expect(response.result).to.have.length(1);
          server.stop(done);
      });
  });
});

lab.experiment("High level API tests", function() {
  lab.test("POST /agent_listener/invoke_raw_method method=get_redirect_host", function(done) {
      const options = {
          method: "POST",
          url: "/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=14&license_key=9f71a99ee183117cbf6c53677435db58804322fa&method=get_redirect_host"
      };
      server.inject(options, function(response) {
          Code.expect(response.statusCode).to.equal(200);
          const command = require('../src/new_relic_commands/get_redirect_host');
          Code.expect(response.result).to.equal(command.exec());
          server.stop(done);
      });
  });
});
