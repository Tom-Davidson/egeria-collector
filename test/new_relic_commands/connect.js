const expect = require("chai").expect;
require('dotenv').config({silent: true});

describe('new_relic_commands/connect', function() {
  const command = require('../../src/new_relic_commands/connect');
  it('has an exec function', function() {
    expect(typeof command).to.equal('object');
    expect(typeof command.exec).to.equal('function');
  });
  it('returns an object with a agent_run_id', function() {
    const result = command.exec({
      query:{method:'connect'},
      payload: [{
        app_name: ['Mock App'],
        host: 'test.domain.com',
        pid: '12345',
        settings: {
          license_key: 'ABCDEF',
          run_id: null
        },
        timestamp: new Date('2021-01-02T12:34:56.789Z').getTime() // dependancy injection for testing
      }]
    })
    const run_id = '7ff92332cf2c51bb55c8d49802165e8a90ea97171fd34559f29de6c17e6f92f4'
    expect(typeof result).to.equal('object')
    expect(typeof result.return_value).to.equal('object')
    expect(typeof result.return_value.agent_run_id).to.equal('string')
    expect(result.return_value.agent_run_id.length).to.equal(run_id.length)
    expect(result.return_value.agent_run_id).to.equal(run_id)
  });
});
