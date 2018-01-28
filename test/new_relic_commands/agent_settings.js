const expect = require("chai").expect;

describe('new_relic_commands/agent_settings', function() {
  const command = require('../../src/new_relic_commands/agent_settings');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object wrapped in an array', function() {
    const result = command.exec({
      query:{method:'agent_settings'}
    });
    expect(typeof result).to.equal('object');
    expect(typeof result.return_value).to.equal('object');
    expect(result.return_value).to.equal(null);
  });
});
