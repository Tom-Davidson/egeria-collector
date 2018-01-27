module.exports = {
  exec: function(method) {
    process.stdout.write("Unknown method '" + method + "' in POST to /agent_listener/invoke_raw_method\n");
    return {
      error: 'Unknown method: ' + method
    }
  }
}
