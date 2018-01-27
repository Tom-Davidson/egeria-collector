const expect = require("chai").expect;
require('dotenv').config({silent: true});

describe('new_relic_commands/unknown', function() {
  const command = require('../../src/new_relic_commands/unknown');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object with an error', function() {
    const result = command.exec('myMethod');
    expect(typeof result).to.equal('object');
    expect(typeof result.error).to.equal('string');
    expect(result.error).to.equal('Unknown method: myMethod');
  });
});
