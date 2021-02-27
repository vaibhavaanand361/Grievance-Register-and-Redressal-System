const express = require('express');
var session = require('express-session');
 
const  router = express.Router();

router.get('/',(req,res) =>{
    res.render('index');
});

router.get('/register',(req,res) =>{
    res.render('register');
});

router.get('/login',(req,res) =>{
    res.render('login');
});

router.get('/officerlogin',(req,res) =>{
    res.render('officerslogin');
});

router.get('/contactus',(req,res) =>{
    res.render('contactus');

});

router.get('/dashboard',(req,res) =>{
    res.render('dashboard');

});

router.get('/aboutus',(req,res) =>{
    res.render('aboutus');

});

router.get('/faq',(req,res) =>{
    res.render('faq');

});
router.get('/noti',(req,res) =>{
    res.render('notice1');

});

router.get('/process',(req,res) =>{
    res.render('process');

});



module.exports = router;