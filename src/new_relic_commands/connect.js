module.exports = {
  exec: function(request_payload) {
    // What's in the payload that's useful? Working on this.
    console.log(request_payload); // eslint-disable-line no-console
    return {
      return_value: {
        agent_run_id: '123456789012345678'
      }
    }
  }
}
