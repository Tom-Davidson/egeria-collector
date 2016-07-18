const expect = require("chai").expect;

describe('new_relic_commands/connect', function() {
  const command = require('../../src/new_relic_commands/agent_settings');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object wrapped in an array', function() {
    result = command.exec('myLicenceKey');
    expect(typeof result).to.equal('object');
    expect(typeof result[0]).to.equal('object');
    expect(typeof result[0].license_key).to.equal('string');
    expect(result[0].license_key).to.equal('myLicenceKey');
  });
});
