
let config = require('config')

exports.isEnv = isEnv;
exports.getEnv = getEnv;
exports.isEnvLiveOrBeta = isEnvLiveOrBeta;
exports.isEnvLive = isEnvLive;
exports.isServer = isServer;



exports.databaseSettings = {
  mysql: {
    master: {
      host: config.get('databaseSettings.host'),
      user: process.env.MYSQL_USER || config.get('databaseSettings.user'),
      password: process.env.MYSQL_PASS || config.get('databaseSettings.password'),
      database: config.get('databaseSettings.database'),
     // multipleStatements: true
    }
  }
};


exports.port = process.env.PORT || config.get('PORT');

function isEnv(env) {
  return process.env.NODE_ENV == env;
}

function isEnvLiveOrBeta() {
  return isEnv('live') || isEnv('beta');
}

function isEnvLive() {
  return isEnv('live');
}

function getEnv() {
  return process.env.NODE_ENV;
}

function isServer(server) {
  return process.env.SERVER == server;
}