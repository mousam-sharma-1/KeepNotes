var express=require("express");
var router=express.Router();
var mongoD = require("../models/mongo");

router.get('/',function(req,res){
        res.render('login',{"message":null});
    })

router.post("/",function(req,res){
	console.log(req.body.email);
    mongoD.findOne({email: req.body.email , password: req.body.password},'users', function(err, result){
		if(err)
    throw err;
		if(result.length>0)
		{
			//var data={ };
			//data.response="success";
            //data.result=result;
            req.session.email=req.body.email;
            req.session.is_user_logged_in=true;
            console.log("success");
            res.redirect("/");
        }
        else{
            console.log("not registered");
            res.render("login",{"message":"User not registered !"})
        }
	});
})
// router.post("/find",function(req,res){
// 	// console.log(req.body.name);
//     mongoD.find('contactus', function(err, result){
// 		res.send(result);
// 		console.log(result);
// 		console.log(result.length);
// 	});
// })
module.exports=router;