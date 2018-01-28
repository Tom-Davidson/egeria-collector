const logger = require('../logger');

module.exports = {
  exec: function(request) {
    logger.debug(request.query.method + ' called');
    return {
      return_value: null
    };
  }
}
