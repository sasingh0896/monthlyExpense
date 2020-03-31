const md5 = require('md5')
const jwt = require('jsonwebtoken')
const responses = require('../../../response/response')
const constant = require('../../../properties/constant')
const signUpServices = require('../services/signUpServices')

exports.signUpController = async (req, res)=> {
 
    var tokanPayload = {
        email:req.body.email,
        phoneno : req.body.phoneno
    }
    try {
      let emailExist = await signUpServices.emailExist((req.body.email))
      if(!emailExist){
      responses.sendResponse(res, "Email Already Exist", constant.responseFlags.SHOW_ERROR_MESSAGE)
      return false;
    }
      let phoneExist = await signUpServices.phoneExist((req.body.phoneNo))
      if(!phoneExist){
        responses.sendResponse(res, "PhoneNo Already Exist", constant.responseFlags.SHOW_ERROR_MESSAGE)
        return false;
    }
    let tokan = createToken(tokanPayload);
    var userDetails=[
        req.body.fullName,
        req.body.email,
        req.body.phoneNo,
        md5(req.body.password),
        tokan
    ]
     let result = await signUpServices.insertuserData(userDetails)
     if(result){
        responses.actionCompleteResponse(res, result)
     }
    }
    catch(error){
        console.log(error)
    }
}


function createToken(tokenPayload){
    var tokan =jwt.sign(tokenPayload, "MyPrivateKey", )
    return tokan;
    }
