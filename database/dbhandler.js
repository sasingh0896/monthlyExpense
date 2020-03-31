const mySql = require('mysql')
const logging = require('../logging/logging')

exports.mysqlQueryPromise = mysqlQueryPromise;
exports.initializeConnectionPool = initializeConnectionPool;

function initializeConnectionPool(dbConfig) {
    return new Promise((resolve, reject) => {
      console.log('CALLING INITIALIZE POOL');
      var numConnectionsInPool = 0;
      var connection = mySql.createPool(dbConfig);
      connection.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log('NUMBER OF CONNECTION IN POOL : ', numConnectionsInPool);
      });
      return resolve(connection);
    });
  }

  var dbClient = {
    executeQuery: function (queryObject, callback, apiReference, noErrorlog) {
      var sql = connection.query(queryObject.query, queryObject.args, function (err, result) {
        var event = queryObject.event || "Executing mysql query";
        if (!apiReference) {
          apiReference = {
            module: "mysqlLib",
            api: "executeQuery"
          }
        }
        logging.log(apiReference, { EVENT: event, ERROR: err, RESULT: result, QUERY: sql.sql });
        if (err) {
          if (!noErrorlog) {
            logSqlError(apiReference, event, err, result, sql.sql);
          }
          if (err.code === 'ER_LOCK_DEADLOCK' || err.code === 'ER_QUERY_INTERRUPTED') {
            setTimeout(module.exports.dbHandler.executeQuery.bind(null, queryObject, callback, apiReference), 50);
          } else {
            callback(err, result, sql);
          }
        } else {
          callback(err, result, sql);
        }
      });
    }
  };
  
  exports.dbHandler = (function () {
    return dbClient;
  })();

function mysqlQueryPromise(apiReference, event, queryString, params, noErrorlog) {
    return new Promise((resolve, reject) => {
      if (!apiReference) {
        apiReference = {
          module: "mysqlLib",
          api: "executeQuery"
        }
      }
      var query = connection.query(queryString, params, function (sqlError, sqlResult) {
        logging.log(apiReference, {
          EVENT: "Executing query " + event, QUERY: query.sql, SQL_ERROR: sqlError,
          SQL_RESULT: sqlResult, SQL_RESULT_LENGTH: sqlResult && sqlResult.length
        });
        if (sqlError || !sqlResult) {
          if (sqlError) {
            if (!noErrorlog) {
              logging.logSqlError(apiReference, event, sqlError, sqlResult, query.sql);
            }
            if (sqlError.code === 'ER_LOCK_DEADLOCK' || sqlError.code === 'ER_QUERY_INTERRUPTED') {
              setTimeout(module.exports.mysqlQueryPromise.bind(null, apiReference, event, queryString, params), 50);
            } else {
              return reject({ ERROR: sqlError, QUERY: query.sql, EVENT: event });
            }
          }
        }
        return resolve(sqlResult);
      });
    });
  }