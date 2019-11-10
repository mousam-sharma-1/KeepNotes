var express=require("express");
var mongodb = require('mongodb');
var router=express.Router();
var mongoD = require("../models/mongo");

router.get('/',function(req,res){
    mongoD.findOne({user: req.session.email,status:"archive"},'Notes', function(err, result){
		if(err)
    throw err;
		if(result.length>0)
		{
            console.log("success"+result.length+"-"+result[0].title);
            res.render('archive',{"message":null,"data":result});
        }
        else{
            console.log("not Notes");
            res.render("archive",{"message":"No archive here","data":null})
        }
	}); 
    })

router.get("/:id",function(req,res){
    console.log(req.params.id);
   
          mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),status:"task"},{status:"archive"},'Notes', function(err, result){
              if(err)
          throw err;
          else{
              console.log("moved to archive!");
              res.redirect("/"); 
          }
      })
      })

      router.get("/unarchive/:id",function(req,res){
        console.log(req.params.id);
       
              mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),status:"archive"},{status:"task"},'Notes', function(err, result){
                  if(err)
              throw err;
              else{
                  console.log("archive moved to task!");
                  res.redirect("/archive"); 
              }
          })
          })
    
      
module.exports=router;