const expect = require("chai").expect;

describe('new_relic_commands/metric_data', function() {
  const command = require('../../src/new_relic_commands/analytic_event_data');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object wrapped in an array', function() {
    result = command.exec();
    expect(typeof result).to.equal('object');
    expect(result.return_value).to.equal(null);
  });
});
