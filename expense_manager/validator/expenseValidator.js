const Joi = require('joi')
const validate = require('../../validator/validation')

exports.expenseValidation = expenseValidation

function expenseValidation(req, res, next){
    req.apiModule = {
        module : "expense_list",
        api : "expense"
    }

    let schema =Joi.array().items(
        Joi.object().keys({
            item_name = Joi.string().required(),
            item_price = Joi.number().required(),
            date = Joi.date().required()
        })
    ) 
    let validatefield =  validate.validateFeilds(req.apirefrence, req.body, res, schema)

    if(validatefield)
    {
        next();
    }
}