
const constants = require('../properties/constant')

exports.actionCompleteResponse = actionCompleteResponse;
exports.authenticationErrorResponse = authenticationErrorResponse;
exports.authenticateEmailNotExists = authenticateEmailNotExists;
exports.sendError = sendError;
exports.wrongPasswordError = wrongPasswordError;
exports.sendResponse = sendResponse;
exports.somethingWentWrongError = somethingWentWrongError;



function actionCompleteResponse(res, msg, data, value){
 var response ={
       Message : msg || constants.responseMessage.ACTION_COMPLETE,
       Status : constants.responseFlags.ACTION_COMPLETE,
       DATA : data || {}
  };
  if(value){
      response.value= value
  }
  res.send(JSON.stringify(response));
}


function authenticationErrorResponse(res, data){
    var response ={
        Message : msg || constants.responseMessage.INVALID_ACCESS_TOKEN,
        Status : constants.responseFlags.INVALID_ACCESS_TOKEN,
        Data : data || {}
    }
    res.send(JSON.stringify(response));
}


function authenticateEmailNotExists(res){
    var response={
        Message : constants.responseMessage.EMAIL_NOT_EXISTS,
        Status : constants.responseFlags.EMAIL_NOT_EXISTS,
        data : {}
    }
    res.send(JSON.stringify(response));
}

function sendError(res, data, message) {
    var response = {
      message: message || constants.responseMessage.ERROR_IN_EXECUTION,
      status: constants.responseFlags.ERROR_IN_EXECUTION,
      data: data || {}
    };
    res.send(JSON.stringify(response));
  }
  
  function wrongPasswordError(res, data) {
    var response = {
      message: constants.responseMessage.WRONG_PASSWORD,
      status: constants.responseFlags.WRONG_PASSWORD,
      data: data || {}
    };
    res.send(JSON.stringify(response));
  }

  function sendResponse(res, msg, status, data, values) {
    var response = {
      message: msg,
      status: status,
      data: data || {}
    };
    if (values) {
      response.values = values;
    }
    res.send(JSON.stringify(response));
  }

  function somethingWentWrongError(res) {
    var response = {
      message: constants.responseMessages.SOMETHING_WENT_WRONG,
      status: constants.whitelabelFormConstants.INTERNAL_ERROR_STATUS,
      data: {}
    };
    res.send(JSON.stringify(response));
  }