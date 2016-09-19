const bunyan = require('bunyan');
const config = require('./config');

module.exports = bunyan.createLogger({
  name : 'logger',
  level : config.level,
  streams :[
    { stream : process.stdout },
    { path : 'skooler.log'}
  ]
});
