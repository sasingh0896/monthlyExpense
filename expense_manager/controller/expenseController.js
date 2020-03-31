const expenseService = require('../services/expenseServices')
const expenseValidator

exports.insertExpense = insertExpense;
exports.to10ExpenseOfTheMonth = to10ExpenseOfTheMonth;

async function insertExpense(req, res){
    let price=[{item_name : req.body.item_name, item_price : req.body.item_price}]


}

async function to10ExpenseOfTheMonth()