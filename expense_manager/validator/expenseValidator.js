const Joi = require('joi')
const validate = require('../../validator/validation')

exports.expenseValidation = expenseValidation

function expenseValidation(req, res, next){
    req.apiModule = {
        module : "expense_list",
        api : "expense"
    }

    let schema = Joi.object().keys({
            items_name : Joi.string().required(),
            items_price : Joi.number().required(),
            purchage_date : Joi.date().required(),
            id : Joi.string().required()
        })
    let validatefield =  validate.validateFeilds(req.apirefrence, req.body, res, schema)

    if(validatefield)
    {
        next();
    }
}