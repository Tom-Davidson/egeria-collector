# Egeria Collector
[![CircleCI](https://circleci.com/gh/Tom-Davidson/egeria-collector.svg?style=svg)](https://circleci.com/gh/Tom-Davidson/egeria-collector)

[Egeria](https://en.wikipedia.org/wiki/Egeria_(deity)) forms a link between your APM requirements to your analytics tools. The collector acts as a replacement endpoint for your (New Relic)[https://newrelic.com/] agent and push the data down into your analytics pipeline.

## Installation
 - Clone the repo: `https://github.com/Tom-Davidson/egeria-collector.git`
 - Install dependancies: `npm install`
 - add your ssl certificates as `key.pem` and `cert.pem`
 - Start the service: `npm start`

## Contributing
 - Fork the repo
 - Clone locally
 - Install dependancies: `npm install`
 - Generate a self-signed ssl certificate: `npm run dev-generatesslcerts`
 - Run tests `npm test`
 - Hack away :-)
 - Submit a pull request with your changes
