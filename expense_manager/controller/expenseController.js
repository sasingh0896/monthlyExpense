const expenseService = require('../services/expenseServices')
const responses = require('../../response/response')

exports.insertExpense = insertExpense;
exports.to10ExpenseOfTheMonth = to10ExpenseOfTheMonth;

 async function insertExpense(req, res){
   try{
    let user_id = await expenseService.getUserId(req.body.id)
    let opts=[]
    opts.push(user_id[0].user_id)
    opts.push(req.body.items_name )
    opts.push(req.body.items_price)
    opts.push(req.body.purchage_date)
    let result = expenseService.insertExpense(opts)
     if(result)
     {
         responses.actionCompleteResponse(res)
     }

    }
    catch(error){
        console.log(error)
    }
}

async function to10ExpenseOfTheMonth(req,res)
{
  let result = await expenseService.top10Expense()

   res.send(JSON.stringify(result))
}