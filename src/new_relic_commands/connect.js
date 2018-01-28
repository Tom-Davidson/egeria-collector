const logger = require('../logger');

module.exports = {
  exec: function(request) {
    logger.debug(request.query.method + ' called');
    return {
      return_value: {
        agent_run_id: '123456789012345678'
      }
    }
  }
}
