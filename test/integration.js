var Lab = require("lab");             // lab testing framework
var lab = exports.lab = Lab.script(); // export test script
var Code = require("code");           // assertion library
var server = require("../server.js"); // our app

lab.experiment("Basic HTTP Tests", function() {
    lab.test("GET /ping", function(done) {
        var options = {
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
