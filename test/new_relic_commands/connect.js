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
    expect(typeof result.agent_run_id).to.equal('string');
    expect(result.agent_run_id).to.equal('agentRunId');
  });
});
