'use strict'
const fs = require('fs');
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
module.exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Egeria Collector'],
  /**
   * Your New Relic license key.
   */
  license_key: '9f71a99ee183117cbf6c53677435db58804322fa',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'trace'
  },
  host: 'localhost',
  port: 8443
}

try{
  fs.accessSync('cert.pem', fs.R_OK);
  module.exports.config.certificates = [ fs.readFileSync('cert.pem', {encoding: 'utf8'}) ]
  process.stdout.write("Imported custom cert into NewRelic config.\n");
}catch(e){
  process.stdout.write("Error while importing custom cert into NewRelic config.\n");
  process.stdout.write(e+"\n");
}
