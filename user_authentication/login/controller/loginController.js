const response = require('../../../response/response')
const logging  = require('../../../logging/logging')
const loginServices = require('../services/loginservices') 
const _  = require('underscore')

exports.loginController = loginController


async function loginController(req, res){
    let email = req.body.email;
    let password = req.body.password;
    try{
         let userInfo = await loginServices.getUserInfo({user_email : email, user_password : password})
         if(_.isEmpty(userInfo)){
             return response.authenticateEmailNotExists(res)
         }
          if(md5(password) != userInfo[0].password){
              return response.wrongPasswordError(res);
          }
          return response.actionCompleteResponse(res, userInfo[0])
    }
    catch(error){
        logging.logError(req.apiReference, {
            EVENT: "authenticateUser ERROR",
            ERROR: error
          });
        return response.sendError(res, error);

    }

}
