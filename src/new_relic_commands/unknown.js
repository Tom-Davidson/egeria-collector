const logger = require('../logger');

module.exports = {
  exec: function(request) {
    logger.debug("Unknown method '" + request.query.method + "' in POST to /agent_listener/invoke_raw_method");
    return {
      error: 'Unknown method: ' + request.query.method
    }
  }
}
