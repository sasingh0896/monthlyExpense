let dbHandler  = require("../../database/dbhandler")

exports.insertExpense = insertExpense;
exports.top10Expense = top10Expense;
exports.getUserId = getUserId;

async function top10Expense()
{
    let query = 'SELECT items_name, items_price FROM expense_table ORDER BY items_price DESC LIMIT 10' 
    let result = await dbHandler.mysqlQueryPromise({module : "top10Expense", api : "expense_manager"},"expense_calculation",
                query)
    return(result);
}

 function insertExpense(opts)
{
    return new Promise(async (resolve, reject)=>{
        let query = "INSERT INTO expense_table(user_id,items_name, items_price, purchage_date) VALUES(?,?,?,?)"
         await  dbHandler.mysqlQueryPromise({module:"insertExpense", api: " expense_manager"},"insert_expense",
        query,opts).then((result)=>{
            resolve(result)
        },(error)=>{reject(error)})  
    })
}

async function getUserId(id)
{
    let query = "SELECT user_id FROM user_details WHERE user_access_token = ?"
    let result = await dbHandler.mysqlQueryPromise({module : "user_id", api : "expense_manager"},"get_user_id", query, id) ;
    return result;
}