# Egeria Collector
[![CircleCI](https://circleci.com/gh/Tom-Davidson/egeria-collector.svg?style=svg&circle-token=aff9a6f785c90bcfa5c8a5d6cea90cbed46802b8)](https://circleci.com/gh/Tom-Davidson/egeria-collector)
[![Dependency Status](https://dependencyci.com/github/Tom-Davidson/egeria-collector/badge)](https://dependencyci.com/github/Tom-Davidson/egeria-collector)

This project is to explore what/how the [New Relic NodeJS agent](https://github.com/newrelic/node-newrelic) communicates with the [New Relic controller](https://newrelic.com/). It is in no way supposed to be actually used, please read the [agent's license](https://github.com/newrelic/node-newrelic/blob/master/LICENSE) for details of what can and can't be done.

## Installation
 - Clone the repo: `https://github.com/Tom-Davidson/egeria-collector.git`
 - Install dependancies: `npm install`
 - add your ssl certificates as `key.pem` and `cert.pem`
 - Add your env vars (see `.env-example` for what to set, ensure HOSTNAME is the name signed on your cert)
 - Start the service: `npm start`

## Contributing
 - Fork the repo
 - Clone locally
 - Set up your env vars or use .env for a quick-start: `ln -s .env-example .env`
 - Install dependancies: `npm install`
 - Generate a self-signed ssl certificate: `npm run dev-generatesslcerts`
 - Run tests `npm test`
 - Hack away :-)
 - Submit a pull request with your changes
