const expenseValidator = require('./validator/expenseValidator')
const expenseController = require('./controller/expenseController')

app.post('/insertExpenseData',expenseValidator.expenseValidation, expenseController.insertExpense)
app.get('/top10Data', expenseController.to10ExpenseOfTheMonth)