var os = require("os");

module.exports = {
  exec: function() {
    return {
      return_value: os.hostname()
    }
  }
}
