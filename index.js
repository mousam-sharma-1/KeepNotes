var express = require('express');
var app = express();
var bodyparser= require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var ejs=require('ejs');
app.set('view engine','ejs');
app.use(express.json());
app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));


app.use(require("./controllers/connect"));


app.listen(process.env.PORT || 3000,function(){
    console.log("Server :3000");
})
