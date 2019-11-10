var express=require("express");
var router=express.Router();
var mongoD = require("../models/mongo");

router.get('/',function(req,res){
    mongoD.findOne({user: req.session.email,status:"task"},'Notes', function(err, result){
		if(err)
    throw err;
		if(result.length>0)
		{
            console.log("success"+result.length+"-"+result[0].title);
            res.render('homepage',{"message":null,"data":result});
        }
        else{
            console.log("not Notes");
            res.render("homepage",{"message":"Notes you add appear here","data":null})
        }
	}); 
    })
router.post('/',function(req,res){
        console.log(req.body.title);
        console.log(req.body.note);
        console.log(req.body.pin);
        console.log(req.body.image);
        console.log(req.body.color);
        console.log(req.session.email);
        mongoD.insertOne({user: req.session.email , title: req.body.title , note: req.body.note , pin: req.body.pin, image: req.body.image, color: req.body.color,status:"task"},'Notes', function(err, result){
            if(err)
        throw err;
            else
            {
                console.log("Note Saved!");
                res.redirect("/")
            }
        });
    })

    module.exports=router;