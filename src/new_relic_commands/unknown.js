module.exports = {
  exec: function(method) {
    console.log("Unknown method '" + method + "' in POST to /agent_listener/invoke_raw_method");
    return {
      error: 'Unknown method: ' + method
    }
  }
}
