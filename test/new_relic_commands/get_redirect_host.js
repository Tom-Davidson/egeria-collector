var os = require("os");
const expect = require("chai").expect;
require('dotenv').config({silent: true});

describe('new_relic_commands/get_redirect_host', function() {
  const command = require('../../src/new_relic_commands/get_redirect_host');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object with a host', function() {
    const result = command.exec();
    expect(typeof result).to.equal('object');
    expect(typeof result.return_value).to.equal('string');
    expect(result.return_value).to.equal(os.hostname());
  });
});
