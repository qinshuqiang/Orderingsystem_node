let express = require('express')
let app = express()
let cors = require("cors");
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
var user = require('./router/user.js');
var order = require('./router/order.js');
app.use('/user', user);
app.use('/order', order);
app.listen(8000)