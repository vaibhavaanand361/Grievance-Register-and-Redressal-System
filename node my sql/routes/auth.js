const express = require('express');
var session = require('express-session');
const authController = require('..//controllers/auth'); 
const  router = express.Router();
const path=require('path');
const bodyparser=require('body-parser');
const multer=require('multer');
const mysql=require("mysql");


const db = mysql.createConnection({
    host:  process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});




router.post('/register',authController.register);
router.post('/updatestatus',authController.updatestatus);
router.post('/updateloanstatus',authController.updateloanstatus);
router.post('/login',authController.login);
router.post('/officerslogin',authController.officerslogin);
router.post('/send',authController.send);
router.post('/resend',authController.resend);

router.post('/verify',authController.verify);
router.post('/changepassword',authController.changepassword);
router.post('/updateprofile',authController.updateprofile);
const uploadImg = require("..//multer");
router.post('/banking',uploadImg().single('image'),function(req,res)
{


    console.log(req.body);
        console.log(req.file);
        console.log(req.body.Category2);

    const filetypes= /pdf/;
        const extname= filetypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimetype=filetypes.test(req.file.mimetype);
        if(mimetype && extname)
        {
            const dep='banking';
            const catogery=req.body.Category2;
            const bn=req.body.bankname;
            const gr=req.body.remarks;
            const pt=req.file.path;
            const id1=req.session.id1;
            const reg= Date.now() + Math.random();
            let date_ob = new Date();

// current date  D:\project\node my sql\uploads\1609091874645receipt bbm payment.pdf
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
var cdate= (year + "-" + month + "-" + date);
            db.query('INSERT INTO banking SET ?', {id:req.session.id1,date:cdate,reg_no:reg,dep:dep,catogery:catogery,bank_name:bn,grievance:gr,document:pt},(error,result)=>{
                if(error)
                {
                console.log(error);
               }
               else{
                   console.log(result);
                   res.render("successfullreg.ejs",{regno:reg,message: 'File uploaded successfully'});

               }
            });
            
        }
            else{
                res.render("banking.ejs",{message: 'only pdfs'});
            }
       // console.log(uploadImg.storage.filename);
        
    
});


//for education
router.post('/school',uploadImg().single('image'),function(req,res)
{


    console.log(req.body);
        console.log(req.file);
        //console.log(req.body.Category2);

    const filetypes= /pdf/;
        const extname= filetypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimetype=filetypes.test(req.file.mimetype);
        if(mimetype && extname)
        {
            const dep='education';
            const catogery=req.body.Category;
            const bn=req.body.SchoolName;
            const gr=req.body.Remarks;
            const pt=req.file.path;
            const id1=req.session.id1;
            const reg= Date.now() + Math.random();
            let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
var cdate= (year + "-" + month + "-" + date);
            db.query('INSERT INTO education SET ?', {id:req.session.id1,date:cdate,reg_no:reg,dep:dep,catogery2:catogery,school_name:bn,grievance:gr,document:pt},(error,result)=>{
                if(error)
                {
                console.log(error);
               }
               else{
                   console.log(result);
                   res.render("successfullreg.ejs",{regno:reg,message: 'File uploaded successfully'});
               }
            });
            
        }
            else{
                res.render("school.ejs",{message: 'only pdfs'});
            }
       // console.log(uploadImg.storage.filename);
        
    
});

//for road
router.post('/road',uploadImg().single('image'),function(req,res)
{


    console.log(req.body);
        console.log(req.file);
        //console.log(req.body.Category2);

    const filetypes= /pdf/;
        const extname= filetypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimetype=filetypes.test(req.file.mimetype);
        if(mimetype && extname)
        {
            const dep='road transport';
            const catogery=req.body.Category2;
            const bn=req.body.StateName;
            const gr=req.body.Remarks;
            const pt=req.file.path;
            const id1=req.session.id1;
            const reg= Date.now() + Math.random();
            let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
var cdate= (year + "-" + month + "-" + date);
            db.query('INSERT INTO road_transport SET ?', {id:req.session.id1,date:cdate,reg_no:reg,dep:dep,catogery3:catogery,state:bn,grievance:gr,document:pt},(error,result)=>{
                if(error)
                {
                console.log(error);
               }
               else{
                   console.log(result);
                   res.render("successfullreg.ejs",{regno:reg,message: 'File uploaded successfully'});
            }
        });
            
        }
            else{
                res.render("road.ejs",{message: 'only pdfs'});
            }
       // console.log(uploadImg.storage.filename);
        
    
});

//for health
router.post('/health',uploadImg().single('image'),function(req,res)
{


    console.log(req.body);
        console.log(req.file);
        //console.log(req.body.Category2);

    const filetypes= /pdf/;
        const extname= filetypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimetype=filetypes.test(req.file.mimetype);
        if(mimetype && extname)
        {
            const dep='education';
            const catogery=req.body.Category2;
            const bn=req.body.HospitalName;
            const gr=req.body.Remarks;
            const pt=req.file.path;
            const id1=req.session.id1;
            const reg= Date.now() + Math.random();
            let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
var cdate= (year + "-" + month + "-" + date);
            db.query('INSERT INTO health SET ?', {id:req.session.id1,date:cdate,reg_no:reg,dep:dep,catogery4:catogery,hospital_name:bn,grievance:gr,document:pt},(error,result)=>{
                if(error)
                {
                console.log(error);
               }
               else{
                   console.log(result);
                   res.render("successfullreg.ejs",{regno:reg,message: 'File uploaded successfully'});
               }
            });
            
        }
            else{
                res.render("health.ejs",{message: 'only pdfs'});
            }
       // console.log(uploadImg.storage.filename);
        
    
});

//for apply loan
router.post('/loanapply',uploadImg().single('image'),function(req,res)
{


    console.log(req.body);
        console.log(req.file);
        //console.log(req.body.Category2);

    const filetypes= /pdf/;
        const extname= filetypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimetype=filetypes.test(req.file.mimetype);
        if(mimetype && extname)
        {
            const dep='education';
            const catogery=req.body.Category;
            //const bn=req.body.HospitalName;
            const gr=req.body.LoanAmount;
            const pt=req.file.path;
            const id1=req.session.id1;
            const reg= Date.now() + Math.random();
            let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
var cdate= (year + "-" + month + "-" + date);
            db.query('INSERT INTO loan SET ?', {id:req.session.id1,date:cdate,reg_no:reg,catogery:catogery,amount:gr,document:pt},(error,result)=>{
                if(error)
                {
                console.log(error);
               }
               else{
                   console.log(result);
                   res.render("successfullloan.ejs",{regno:reg,message: 'File uploaded successfully'});

               }
            });
            
        }
            else{
                res.render("loanapply.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:'Pdfs only'});
            }
       // console.log(uploadImg.storage.filename);
        
    
});

router.get('/loan',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    var count=0;
    var results1= new Array();
       db.query('SELECT * FROM loan WHERE id =?',[req.session.id1],async(error,results) =>{
           if(error)
           {
               console.log(error)
           }
           else
           {
               //console.log(results);
               (results).forEach(ele=> {
                var obj=new Object();
                   if(ele.status)
                   {
                   ele.status='accepted';
                   obj.status='Sanctioned';
                  // count++;
                   }
                   else
                   {
                   ele.status='rejected';
                   obj.status='pending';
                   }
                   obj.date=ele.date;
                   obj.regno=ele.reg_no;
                   obj.doc=ele.document;
                  // obj.grievance=ele.grievance;
                   obj.catogery=ele.catogery;
                  // obj.name=ele.bank_name;
                   results1.push(obj);
                })
               
                //console.log(results1);
                res.render("loan_dashboard.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,c:count,results1:results1,message:''}); 
        }
       
    
        
 });
   

});

router.get('/loanapply',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("loanapply.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});


router.get('/officersloandashboard',(req,res) =>{
   
    var results1= new Array();
    var count=0;
       db.query('SELECT * FROM loan',async(error,results) =>{
           if(error)
           {
               console.log(error)
           }
           else
           {
               //console.log(results);
               (results).forEach(ele=> {
                var obj=new Object();
                   if(ele.status)
                   {
                   ele.status='accepted';
                   obj.status='Sanctioned';
                   count++;
                   }
                   else
                   {
                   ele.status='rejected';
                   obj.status='pending';
                   }
                   obj.date=ele.date;
                   obj.regno=ele.reg_no;
                   obj.doc=ele.document;
                  // obj.grievance=ele.grievance;
                   obj.catogery=ele.catogery;
                   //obj.name=ele.bank_name;
                   results1.push(obj);
                })
                //console.log(results1);
                
        }
       
        res.render("officersloandashboard.ejs",{c:count,results1:results1,message:''});
        
 });
   

});


router.get('/updateprofile',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("updateprofile.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});

router.get('/organisation',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("organisation.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});
router.get('/banking',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("banking.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});
router.get('/school',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("school.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});
router.get('/road',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("road.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});
router.get('/health',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    res.render("health.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,message:''});

});

router.get('/notice',(req,res) =>{
    res.render('notice');

});

router.post('/logout',(req,res) =>{
    console.log(req.session.name);
    req.session.destroy();
    //res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/login')
});

router.post('/officerslogout',(req,res) =>{
    console.log(req.session.name);
    req.session.destroy();
    res.redirect('/login')
});



router.get('/faq',(req,res) =>{
    res.render('faq');

});


router.get('/returndashboard', (req,res) => {

//query for banking
id=req.session.id1;
var count=0;
try{
    //console.log(id);
var results1= new Array();
db.query('SELECT * FROM banking WHERE id =?',[id],async(error,results) =>{
    if(error)
    {
        console.log(error)
    }
    else
    {
        //console.log(results);
        (results).forEach(ele=> {
         var obj=new Object();
            if(ele.status)
            {
            ele.status='accepted';
            obj.status='rectified and closed';
            count++;
            }
            else
            {
            ele.status='rejected';
            obj.status='pending';
            }
            obj.date=ele.date;
            obj.regno=ele.reg_no;
            obj.doc=ele.document;
            obj.grievance=ele.grievance;
            obj.catogery=ele.catogery;
            obj.name=ele.bank_name;
            results1.push(obj);
         })
         console.log(results1);
         
 }


});


//query for education
var results2= new Array();
db.query('SELECT * FROM education WHERE id =?',[id],async(error,results) =>{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results);
        (results).forEach(ele=> {
         var obj2=new Object();
            if(ele.status)
            {
            ele.status='accepted';
            obj2.status='rectified and closed';
            count++;
            }
            else
            {
            ele.status='rejected';
            obj2.status='pending';
            }
            obj2.date=ele.date;
            obj2.regno=ele.reg_no;
            obj2.doc=ele.document;
            obj2.grievance=ele.grievance;
            obj2.catogery=ele.catogery2;
            obj2.name=ele.school_name;
            results2.push(obj2);
         })
        console.log(results2);
 }

});

//query for health

var results3= new Array();
db.query('SELECT * FROM health WHERE id =?',[id],async(error,results) =>{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results);
        (results).forEach(ele=> {
         var obj3=new Object();
            if(ele.status)
            {
            ele.status='accepted';
            obj3.status='rectified and closed';
            count++;
            }
            else
            {
            ele.status='rejected';
            obj3.status='pending';
            }
            obj3.date=ele.date;
            obj3.regno=ele.reg_no;
            obj3.doc=ele.document;
            obj3.grievance=ele.grievance;
            obj3.catogery=ele.catogery4;
            obj3.name=ele.hospital_name;
            results3.push(obj3);
         })
        // console.log(results3);
 }

});

//query for road transport
var results4= new Array();
db.query('SELECT * FROM road_transport WHERE id =?',[id],async(error,results) =>{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results);
        (results).forEach(ele=> {
         var obj4=new Object();
            if(ele.status)
            {
            ele.status='accepted';
            obj4.status='rectified and closed';
            count++;
            }
            else
            {
            ele.status='rejected';
            obj4.status='pending';
            }
            obj4.date=ele.date;
            obj4.regno=ele.reg_no;
            obj4.doc=ele.document;
            obj4.grievance=ele.grievance;
            obj4.catogery=ele.catogery3;
            obj4.name=ele.state;
            results4.push(obj4);
         })
         console.log(results4);
 }
 console.log(results1.length);
 console.log(results2.length);
 console.log(results3.length);
 console.log(results4.length);
 var c=0;
 var user = { name:req.session.name, email: req.session.email};
 res.status(200).render("dashboard.ejs",{user:user,results1:results1,results2:results2,results3:results3,results4:results4,count:count,c:c});


});


//console.log("here we go");


//res.status(200).render("dashboard.ejs",{user:user,results1:results1,results2:results2,results3:results3,results4:results4,count:count});

}
catch(error) {
console.log(error);
}


});


router.get('/checkloanstatus',(req,res) =>{
    console.log(req.session.name);
    console.log(req.session.sex);
    var count=0;
    var results1= new Array();
       db.query('SELECT * FROM loan WHERE id =?',[req.session.id1],async(error,results) =>{
           if(error)
           {
               console.log(error)
           }
           else
           {
               //console.log(results);
               (results).forEach(ele=> {
                var obj=new Object();
                   if(ele.status)
                   {
                   ele.status='accepted';
                   obj.status='rectified and closed';
                  // count++;
                   }
                   else
                   {
                   ele.status='rejected';
                   obj.status='pending';
                   }
                   obj.date=ele.date;
                   obj.regno=ele.reg_no;
                   obj.doc=ele.document;
                  // obj.grievance=ele.grievance;
                   obj.catogery=ele.catogery;
                  // obj.name=ele.bank_name;
                   results1.push(obj);
                })
               
                //console.log(results1);
                res.render("loan_dashboard.ejs",{name:req.session.name,email:req.session.email,sex:req.session.sex,district:req.session.district, state:req.session.state, mobileno:req.session.mobileno,c:count,results1:results1,message:''}); 
        }
       
    
        
 });
   

});


router.get('/returnoffdashboard', (req,res) => {

    //query for banking
    id=req.session.id1;
    var count=0;
    try{
        //console.log(id);
        var results1= new Array();
        db.query('SELECT * FROM banking' ,async(error,results) =>{
            if(error)
            {
                console.log(error)
            }
            else
            {
                //console.log(results);
                (results).forEach(ele=> {
                 var obj=new Object();
                    if(ele.status)
                    {
                    ele.status='accepted';
                    obj.status='rectified and closed';
                    count++;
                    }
                    else
                    {
                    ele.status='rejected';
                    obj.status='pending';
                    }
                    obj.date=ele.date;
                    obj.regno=ele.reg_no;
                    obj.doc=ele.document;
                    obj.grievance=ele.grievance;
                    obj.catogery=ele.catogery;
                    obj.name=ele.bank_name;
                    results1.push(obj);
                 })
                 //console.log(results1);
                 
         }
        
     
  });
  
 
  //query for education
  var results2= new Array();
        db.query('SELECT * FROM education' ,async(error,results) =>{
            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log(results);
                (results).forEach(ele=> {
                 var obj2=new Object();
                    if(ele.status)
                    {
                    ele.status='accepted';
                    obj2.status='rectified and closed';
                    count++;
                    }
                    else
                    {
                    ele.status='rejected';
                    obj2.status='pending';
                    }
                    obj2.date=ele.date;
                    obj2.regno=ele.reg_no;
                    obj2.doc=ele.document;
                    obj2.grievance=ele.grievance;
                    obj2.catogery=ele.catogery2;
                    obj2.name=ele.school_name;
                    results2.push(obj2);
                 })
                // console.log(results2);
         }
 
  });
 
  //query for health
 
  var results3= new Array();
        db.query('SELECT * FROM health' ,async(error,results) =>{
            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log(results);
                (results).forEach(ele=> {
                 var obj3=new Object();
                    if(ele.status)
                    {
                    ele.status='accepted';
                    obj3.status='rectified and closed';
                    count++;
                    }
                    else
                    {
                    ele.status='rejected';
                    obj3.status='pending';
                    }
                    obj3.date=ele.date;
                    obj3.regno=ele.reg_no;
                    obj3.doc=ele.document;
                    obj3.grievance=ele.grievance;
                    obj3.catogery=ele.catogery4;
                    obj3.name=ele.hospital_name;
                    results3.push(obj3);
                 })
                // console.log(results3);
         }
 
  });
 
 //query for road transport
 var results4= new Array();
        db.query('SELECT * FROM road_transport',async(error,results) =>{
            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log(results);
                (results).forEach(ele=> {
                 var obj4=new Object();
                    if(ele.status)
                    {
                    ele.status='accepted';
                    obj4.status='rectified and closed';
                    count++;
                    }
                    else
                    {
                    ele.status='rejected';
                    obj4.status='pending';
                    }
                    obj4.date=ele.date;
                    obj4.regno=ele.reg_no;
                    obj4.doc=ele.document;
                    obj4.grievance=ele.grievance;
                    obj4.catogery=ele.catogery3;
                    obj4.name=ele.state;
                    results4.push(obj4);
                 })
                // console.log(results4);
         }
         console.log(results1.length);
         console.log(results2.length);
         console.log(results3.length);
         console.log(results4.length);
         var c=0;
         res.status(200).render("officersdashboard.ejs",{results1:results1,results2:results2,results3:results3,results4:results4,c:c});
        
 
  });

        //res.status(200).render("officersdashboard.ejs");
   

       }
   
    catch(error) {
    console.log(error);
    }
    
    
    });
    
    


module.exports = router;