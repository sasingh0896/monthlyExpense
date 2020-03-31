var moment    =   require('moment')


exports.log             =   log
exports.logError        =   logError 
exports.logSqlError     =   logSqlError

var new_dubugging_enabled = true;


function log(apiRefrence, log)
{
  if(new_dubugging_enabled 
    && apiRefrence 
    && apiRefrence.module 
    && apiRefrence.api){

      try{
        log = JSON.stringify(log)
      }
      catch(exception){
      
        console.log('--->'+ moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
        apiReference.module + " :=: " + apiReference.api + " :=: " + log)
      }
    }

}

function logError(apiReference, log) {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
}

function logSqlError(apiReference, event, err, result, sql) {
  if (!sql) {
    sql = {};
  }
  var log = { EVENT: event, ERROR: err, RESULT: result, QUERY: sql };
  try {
    log = JSON.stringify(log);
  }
  catch (exception) {
  }
  console.error("--> Error in sql query " + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
    apiReference.module + " :=: " + apiReference.api + " :=: " + log);

}