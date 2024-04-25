const express = require('express');
const app = express();
const {index} = require('./router/index.js');
const session = require( 'express-session')

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret:'myscretkey',
	resave:false,
	saveUninitialized:false

}))
app.use(index);

app.listen(3021, () => { console.log("server Started on Port 3021") })