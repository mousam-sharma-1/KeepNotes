var express=require("express");
var router=express.Router();
var nodemailer = require('nodemailer');
var mongoD = require("../models/mongo");


router.get("/",function(req,res){
res.render("forget");
  })


router.post("/",function(req,res){
console.log(req.body.email);
mongoD.findOne({email: req.body.email},'users', function(err, result){
    if(err)
throw err;
    if(result.length>0)
    {
        console.log("success : "+result[0].password);
        
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'mousam.sharma13@gmail.com',
        pass: 'mousam1399'
    }
});

let mailOptions = {
    from: 'mousam.sharma13@gmail.com',
    to: req.body.email,
    subject: 'Password For KeepNotes',
    html: '<h1>Hello '+result[0].name+'</h1><p>your password for KeepNotes is : '+result[0].password+'</p>'
    // text: 'your password for KeepNotes is : '+result[0].password
};
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.render("login",{"message":"password sent to your mail !"});
     // res.send(req.body.email);
    }
  });
    }
    else{
        console.log("no account exsist !");
        res.render("login",{"message":"No account found !"})
    }
});
 })

module.exports=router;