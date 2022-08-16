const Log4gs = require('log4js');

// Logging settings
Log4gs.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'application.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
});

module.exports.Logger = Log4gs.getLogger();
