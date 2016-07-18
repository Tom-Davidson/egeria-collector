const expect = require("chai").expect;
require('dotenv').config({silent: true});

describe('new_relic_commands/connect', function() {
  const command = require('../../src/new_relic_commands/connect');
  const payload = { app_name: ['Mock App'] };
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object with a agent_run_id', function() {
    result = command.exec(payload);
    expect(typeof result).to.equal('object');
    expect(typeof result.return_value).to.equal('object');
    expect(typeof result.return_value.agent_run_id).to.equal('string');
    expect(result.return_value.agent_run_id.length).to.equal(18);
    expect(result.return_value.agent_run_id).to.equal('123456789012345678');
  });
});
