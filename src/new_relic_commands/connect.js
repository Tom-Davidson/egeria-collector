const crypto = require('crypto');
const logger = require('../logger');

module.exports = {
  exec: function(request) {
    logger.debug(request.query.method + ' called')
    const run_id = (
      request.payload[0].settings.run_id ||
      generateRunID(
        request.payload[0].host,
        request.payload[0].pid,
        request.payload[0].app_name[0],
        request.payload[0].timestamp // never passed by the agent so == null, just for testing
      )
    )
    const app_run = {
      execution: {
        app: request.payload[0].app_name[0],
        host: request.payload[0].host,
        pid: request.payload[0].pid,
        run_id: run_id
      },
      settings: {
        license_key: request.payload[0].settings.license_key,
      }
    }
    logger.debug(app_run)
    return {
      return_value: {
        agent_run_id: run_id
      }
    }
  }
}

function generateRunID(host, pid, app, timestamp = new Date().getTime()){
  /*
  Examples:
  WzIse2E6MTkxMTE3NzA0NyxiOjEwNjExMDAwOSxjOjE0ODA3NCxkOiIyLjYuMSIsZToibm9kZWpzIixmOiJUb21zLU1hY0Jvb2stUHJvLTIubG9jYWwiLGc6W3thOjI4NjgwODE5LGI6IkVnZXJpYSBDb2xsZWN0b3IifV19LDQwMjYzMDEwMDdd
  WzIse2E6MTkxMTE5MjEwNSxiOjEwNjExMDAwOSxjOjE0ODA3NCxkOiIyLjYuMSIsZToibm9kZWpzIixmOiJUb21zLU1hY0Jvb2stUHJvLTIubG9jYWwiLGc6W3thOjI4NjgwODE5LGI6IkVnZXJpYSBDb2xsZWN0b3IifV19LDI4NTIzMzk1OF0
  WzIse2E6MTkxMTE5NDE5MSxiOjEwNjExMDAwOSxjOjE0ODA3NCxkOiIyLjYuMSIsZToibm9kZWpzIixmOiJUb21zLU1hY0Jvb2stUHJvLTIubG9jYWwiLGc6W3thOjI4NjgwODE5LGI6IkVnZXJpYSBDb2xsZWN0b3IifV19LDI2MjE2NTc1Nzhd
  WzIse2E6MTkxMTIyNTY1NCxiOjEwNjExMDAwOSxjOjE0ODA3NCxkOiIyLjYuMSIsZToibm9kZWpzIixmOiJUb21zLU1hY0Jvb2stUHJvLTIubG9jYWwiLGc6W3thOjI4NjgwODE5LGI6IkVnZXJpYSBDb2xsZWN0b3IifV19LDM2MTA5OTM1Mzld
  */
  // process.hrtime() is more nanoseconds but the actual timestamp
  const hash = crypto.createHash('sha256')
  hash.update(host+':'+pid+'/'+app+'?'+timestamp)
  const run_id = hash.digest('hex').replace(/\W/g, '')
  return run_id
}
