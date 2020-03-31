const Joi = require('joi')
const logging = require('../logging/logging')
const response = require('../response/response')
const constant = require('../properties/constant')

exports.validateFeilds = validateFeilds

function validateFeilds(apiReference, req, res, schema) {
    logging.log(apiReference,{REQUEST_BODY: req})
    let validation = Joi.validate(req,schema)
     if(validation.error){
         let errorReason = 
         validation.error.details !== undefined 
         ? validation.error.details[0].message
         : 'Parameter missing or parameter type is wrong';
         logging.log(apiReference, validation.error.details)
         response.sendResponse(res, errorReason, constant.responseFlags.PARAMETER_MISSING )
      return false;
     }
     return true;
}
