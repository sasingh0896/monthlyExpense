const response = require('../../../response/response')
const logging  = require('../../../logging/logging')
const loginServices = require('../services/loginservices') 
const _  = require('underscore')
const md5 = require('md5')

exports.loginController = loginController


async function loginController(req, res){
    let email = req.body.email;
    let password = req.body.password;
    let opts=[]
    opts.push(email);
    try{
         let userInfo = await loginServices.getUserInfo(opts)
         if(_.isEmpty(userInfo[0].user_email)){
             return response.authenticateEmailNotExists(res)
         }

          if(md5(password) != userInfo[0].user_password){
              return response.wrongPasswordError(res);
          }
          return response.actionCompleteResponse(res,"User Loggin", userInfo[0])
    }
    catch(error){
        logging.logError(req.apiReference, {
            EVENT: "authenticateUser ERROR",
            ERROR: error
          });
        return response.sendError(res, error);

    }

}
