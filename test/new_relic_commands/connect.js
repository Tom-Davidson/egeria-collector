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
        date: new Date('2021-01-02T12:34:56.789Z') // dependancy injection for testing
      }]
    })
    const run_id = '83100218b7082a8284ed1d1ff58ef98effbdf070280d04924f139c3a95163c55'
    expect(typeof result).to.equal('object')
    expect(typeof result.return_value).to.equal('object')
    expect(typeof result.return_value.agent_run_id).to.equal('string')
    expect(result.return_value.agent_run_id.length).to.equal(run_id.length)
    expect(result.return_value.agent_run_id).to.equal(run_id)
  });
});
