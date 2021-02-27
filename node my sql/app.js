const express= require("express");
var session = require('express-session');
const path= require('path');
const mysql=require("mysql");
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
dotenv.config({ path: './.env'});

const app= express();

const db = mysql.createConnection({
    host:  process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use('uploads', express.static(path.join(__dirname, './uploads')));

//parse url -encoded bodies sent by html forms
app.use(express.urlencoded({ extended: false}));
app.use(express.static('views/images'));
// parse json bodies sent by API CLIENTS
app.use(express.json());
app.use(cookieParser());
//console.log(__dirname)
app.set('view engine','ejs');
app.set('view engine', 'hbs');

db.connect((error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log("my sql is connnected")
    }
})

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(5000,() => {
console.log("server statred on port 5000");
})
