const express = require('express');
const bodyParser = require('body-parser');
config = require("config")
const startUpServices = require('./services/startUpServices')
const envproperties = require("./properties/envProperties")


app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

startUpServices.initializeServer();
app.set("port", envproperties.port)

require('./user_authentication');
require('./expense_manager');

//start server  export NODE_ENV=config     