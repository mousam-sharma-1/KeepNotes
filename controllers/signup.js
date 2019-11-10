var express=require("express");
var router=express.Router();
var mongoD = require("../models/mongo");

router.get('/',function(req,res){
        res.render('signup',{"message":null});
    })

router.post('/',function(req,res){
    console.log(req.body.name);
    mongoD.findOne({email: req.body.email},'users', function(err, result){
		if(err)
    throw err;
    console.log(result.length);
		if(result.length>0){
            res.render("signup",{"message":"User already registered !"})
        }
        else{
            mongoD.insertOne({name: req.body.name , mobile: req.body.mobile , email: req.body.email , password: req.body.password},'users', function(err, result){
                if(err)
            throw err;
                else
                {
                    req.session.email=req.body.email;
                    req.session.is_user_logged_in=true;
                    console.log("Saved!"+req.session.email);
                    res.redirect("/");
                }
            });
        }
	});
   
})
module.exports=router;