const Joi = require('joi')
const validate = require('./../../../validator/validation')

exports.signUpValidation = signUpValidation

function signUpValidation(req, res, next){
req.apiReference={
    module : "Signup",
    api : "SignUp"
};
var schema  = Joi.object().keys({
    fullName : Joi.string().required(),
    email: Joi.string().email({minDomainAtoms: 2}).required(),
    password : Joi.string().min(5).max(8).required(),
    phoneNo : Joi.string().required()
})

let validatefeilds = validate.validateFeilds(req.apiReference, req.body, res, schema)
if(validatefeilds){
    next();
}
}