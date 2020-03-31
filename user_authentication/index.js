const singnUpController = require("./singnup/controller/signUpController")
const signUpValidator   = require('./singnup/validator/signUpValidation')
const loginValidator   = require('./login/validator/loginVlidation') 
const loginController  = require('./login/controller/loginController')

app.post('/signup', signUpValidator.signUpValidation,singnUpController.signUpController)
app.post('/login', loginValidator.loginValidation, loginController.loginController)