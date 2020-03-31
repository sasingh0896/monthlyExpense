const Joi = require('joi')

const validate = require('../../../validator/validation')

exports.loginValidation =  loginValidation

function loginValidation(req, res, next){
    req.apirefrence={
        module : "login",
        api : "login"
    };

    var schema =Joi.object().keys({
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password : Joi.string().min(5).max(8).required(), 
    }) 
        
    var validatefeilds = validate.validateFeilds(req.apirefrence, req.body, res, schema)

    if(validatefeilds){
        next();
    }
}