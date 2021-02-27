const mysql=require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const session = require("express-session");
const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const multer = require('multer');



const app=express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: process.env.my_email,
      pass: process.env.my_password
    }
    
});


const db = mysql.createConnection({
    host:  process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//loan status update
exports.updateloanstatus = (req,res) =>{
    var iv=req.body.vote;
    var regno=req.body.regno;
    console.log(req.body);
    db.query('SELECT * FROM loan WHERE reg_no =?',[regno],async(error,results) =>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(iv=='accepted')
            {
                var sql = "UPDATE loan SET status=? WHERE reg_no =?";
    let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersloanupdate.ejs',{
          message :'Data updated successfully'});
            }

            
        });
  }

  if(iv=='rejected')
            {
                var sql = "UPDATE banking SET status=? WHERE reg_no =?";
                let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersloanupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
  }
}


    });
}
//grievance approval
exports.updatestatus = (req,res) =>{
    var iv=req.body.vote;
    var regno=req.body.regno;
    console.log(req.body);
  if(req.body.type=='banking')
  {
    db.query('SELECT * FROM banking WHERE reg_no =?',[regno],async(error,results) =>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(iv=='accepted')
            {
                var sql = "UPDATE banking SET status=? WHERE reg_no =?";
    let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

            
        });
  }

  if(iv=='rejected')
            {
                var sql = "UPDATE banking SET status=? WHERE reg_no =?";
                let data=[0,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
  }
}


    });
}


if(req.body.type=='health')
  {
    db.query('SELECT * FROM health WHERE reg_no =?',[regno],async(error,results) =>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(iv=='accepted')
            {
                var sql = "UPDATE health SET status=? WHERE reg_no =?";
    let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
  }

  if(iv=='rejected')
            {
                var sql = "UPDATE health SET status=? WHERE reg_no =?";
    let data=[0,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
    }
  }
  
  
      });
  }

if(req.body.type=='education')
  {
    db.query('SELECT * FROM education WHERE reg_no =?',[regno],async(error,results) =>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(iv=='accepted')
            {
                var sql = "UPDATE education SET status=? WHERE reg_no =?";
    let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
  }

  if(iv=='rejected')
            {
                var sql = "UPDATE education SET status=? WHERE reg_no =?";
    let data=[0,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
    }
  }
  
  
      });
  }

if(req.body.type=='road_transport')
  {
    db.query('SELECT * FROM road_transport WHERE reg_no =?',[regno],async(error,results) =>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            if(iv=='accepted')
            {
                var sql = "UPDATE road_transport SET status=? WHERE reg_no =?";
    let data=[1,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
  }

  if(iv=='rejected')
            {
                var sql = "UPDATE road_transport SET status=? WHERE reg_no =?";
    let data=[0,regno];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('officersgreupdate.ejs',{
          message :'Data updated successfully'});
            }

        });
    }
  }
  
  
      });
  }


}
//officers login page k liye
exports.officerslogin = async (req,res) =>{
    try{
       const {email,password} =req.body;
       console.log(req.body);
       if(!email||!password)
       {
           return res.status(400).render('officerslogin',{
               message : 'Please Provide An Email And Password'
           })
       }
       else
       {
       db.query('SELECT * FROM officer WHERE email =?',[email],async(error,resultsu) =>{
           try {
           //console.log(resultsu);
            if(!(resultsu.length>0)) 
            {
             return res.status(401).render('officerslogin',{
                message : 'Email Or Password Is Incorrect'
            })
         }
    
         else if(!(await bcrypt.compare(password, resultsu[0].password)))
            {
            res.status(401).render('officerslogin',{
                message : 'Email Or Password Is Incorrect'
            })
         }
    
         else{

            var count=0;
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
           }
       
    
           catch(error){
               console.log(error);
           }
           });
        }
        
        }catch(error) {
            console.log(error);
        }
        }
       

//login page ke liye
exports.login = async (req,res) =>{
try{
   const {email,password} =req.body;
   console.log(req.body);
   if(!email||!password)
   {
       return res.status(400).render('login',{
           message : 'Please Provide An Email And Password'
       })
   }
   db.query('SELECT * FROM users WHERE email =?',[email],async(error,resultsu) =>{
       try {
       //console.log(resultsu);
        if(!(resultsu.length>0)) 
        {
         return res.status(401).render('login',{
            message : 'Email Or Password Is Incorrect'
        })
     }

     else if(!(await bcrypt.compare(password, resultsu[0].password)))
        {
        res.status(401).render('login',{
            message : 'Email Or Password Is Incorrect'
        })
     }

     else{
         var count =0;
        req.session.loggedin = true;
        req.session.name = resultsu[0].name;
        req.session.email = resultsu[0].email;
        req.session.sex=resultsu[0].sex;
        req.session.district=resultsu[0].district;
        req.session.state=resultsu[0].state;
        req.session.mobileno=resultsu[0].mobile;
         const id =resultsu[0].id;
         req.session.id1=resultsu[0].id;
         console.log(req.session.id1);
 
         const token = jwt.sign({ id },process.env.JWT_SECRET,{
           expiresIn: process.env.JWT_EXPIRES_IN  
         });
 
      console.log("the token is : "+ token);
 
      const cookieOptions={
          expires: new Date(
              Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 *60 *60 *1000
          ),
         httpOnly:true
      }
      var user = { name:resultsu[0].name, email: resultsu[0].email};
       res.cookie('jwt',token,cookieOptions);
       var sta;
       
       //console.log(req.session);

       //query for banking
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
                   obj.doc='../'+ele.document;
                   console.log(obj.doc);
                   obj.grievance=ele.grievance;
                   obj.catogery=ele.catogery;
                   obj.name=ele.bank_name;
                   results1.push(obj);
                })
                //console.log(results1);D:\project\node my sql\uploads\1609091874645receipt bbm payment.pdf
                
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
               // console.log(results2);
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
               // console.log(results4);
        }
        console.log(results1.length);
        console.log(results2.length);
        console.log(results3.length);
        console.log(results4.length);
        var c=0;
        res.status(200).render("dashboard.ejs",{user:user,results1:results1,results2:results2,results3:results3,results4:results4,count:count,c:c});
       

 });


 //console.log("here we go");
 
 
 //res.status(200).render("dashboard.ejs",{user:user,results1:results1,results2:results2,results3:results3,results4:results4,count:count});
       
     }
    }
    catch(error){
        console.log(error);
    }
    });
 
 }catch(error) {
     console.log(error);
 }
 }

//otp send k liye
exports.send=(req,res)=>
{
    var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

email=req.session.email;
req.session.otp=otp;
     // send mail with defined transport object
    var mailOptions={
        to: req.session.email,
       subject: "Otp for password change is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('emailotp');
    });
    
}

//otp resend
exports.resend=(req,res)=>
{
    var mailOptions={
        to: req.session.email,
       subject: "Otp for password change is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + req.session.otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('emailotp',{msg:"otp has been sent"});
    });
}

//otp verification
exports.verify=(req,res)=>
{
    if(req.body.otp==req.session.otp){
        res.render('changepassword.ejs',{message:''});
    }
    else{
        res.render('emailotp',{msg : 'otp is incorrect'});
    } 
}

 //change password page k liye
 exports.changepassword=(req,res)=>
 {
    const{password,passwordconfirm } = req.body;
    if(password!=passwordconfirm)
return res.render('changepassword.ejs',{
    message :'Password Do Not Matched'
});
else{
    var email=req.session.email;
     bcrypt.hash(password,8,function(error,hashedPassword){
    console.log(email);
    var sql = "UPDATE users SET password =? WHERE email = ?";
    let data = [hashedPassword, req.session.email];
    db.query(sql,data, (err, result)=>{
      if (err) throw err;
      else{
      console.log(result.affectedRows + " record(s) updated");
      return res.render('changepassword.ejs',{
        message :'Passsword updated successfully'
    });
      }
    });
 });
}
 }
 
 //update profile k liye
 exports.updateprofile=(req,res)=>{
    const{email,mobileno,district,state} = req.body;
    console.log(req.body); 
    var sql = "UPDATE users SET mobile=?,district=?,state=? WHERE email = ?";
    let data=[mobileno,district,state,req.session.email];
    db.query(sql,data, (err, result)=>{
        if (err) throw err;
        else{
        console.log(result.affectedRows + " record(s) updated");
        return res.render('updateprofile.ejs', {name:req.session.name,email:email,district:district,state:state,mobileno:mobileno,sex:req.session.sex,
          message :'Profile updated successfully'
        });
    }
 
});
 }
 
//register page ke liye   
exports.register = (req,res) =>{
    console.log(req.body);

  const{name,email,sex,state,district,mobileno,password,passwordconfirm } = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async(error,results) =>{
      if(error){
          console.log(error);
      }
      if(results.length>0){
          return res.render('register',{
              message :'Email Already Used'
          });
      }
      else if(password!=passwordconfirm ){
        return res.render('register',{
            message :'Password Do Not Matched'
        });
      }
      
    else{
        let hashedPasssword = await bcrypt.hash(password,8);
     //console.log(hashedPassword);

     db.query('INSERT INTO users SET ?', {name:name,email:email,sex:sex,state:state,district:district,mobile:mobileno,password:hashedPasssword},(error,result)=>{
         if(error)
         {
         console.log(error);
        }
        else{
            console.log(result);
            return res.render('register',{
                message :'User Registered Successfully,Kindly Login'
            });
        }
     });
    }

  });
}