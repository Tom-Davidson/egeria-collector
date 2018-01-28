// Super naive logger, replace with somethink like bucker
logger = {
  level: {
    ERROR: 3,
    WARNING: 2,
    INFO: 1,
    DEBUG: 0,
  },
  error: function(message) { _log(logger.level.ERROR, message) },
  warn: function(message) { _log(logger.level.WARNING, message) },
  info: function(message) { _log(logger.level.INFO, message) },
  debug: function(message) { _log(logger.level.DEBUG, message) },
}
module.exports = logger;

function _log(level, message){
  if(
    (process.env.NODE_ENV == 'production' && level >= logger.level.WARNING)
    || (process.env.NODE_ENV == 'test' && level >= logger.level.INFO)
    || (process.env.NODE_ENV == 'dev' && level >= logger.level.DEBUG)
  ){
    process.stdout.write(message);
  }
}
