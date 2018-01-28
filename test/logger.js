const expect = require("chai").expect;
const logger = require('./src/logger');

describe('logger', function() {
  it('has an error function', function() {
    expect(typeof logger.error).to.equal('function');
  });
  it('has a warning function', function() {
    expect(typeof logger.warn).to.equal('function');
  });
  it('has an info function', function() {
    expect(typeof logger.info).to.equal('function');
  });
  it('has a debug function', function() {
    expect(typeof logger.debug).to.equal('function');
  });
});
