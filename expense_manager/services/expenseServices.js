let dbHandler  = require("../../database/dbhandler")

exports.insertExpense = insertExpense;
exports.top10Expense = top10Expense;
exports.getUserId = getUserId;

async function top10Expense()
{
    let query = 'SELECT items_name, item_price FROM expense_table ORDER BY item_price DESC LIMIT 10' 
    let result = await dbHandler.mysqlQueryPromise({module : "top10Expense", api : "expense_manager"},"expense_calculation",
                query)
    return(result);
}

 function insertExpense()
{
    return new promise(async (resolve, reject)=>{
        let query = "INSERT INTO "
    })
}

function getUserId(id)
{
    let query = "SELECT user_id FROM user_details WHERE user_access_token = ?"
    let result = dbHandler.mysqlQueryPromise({module : "user_id", api : "expense_manager"},"", query, id) ;
    return result[0];
}