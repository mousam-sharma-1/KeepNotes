var express=require("express");
var mongodb = require('mongodb');
var router=express.Router();
var mongoD = require("../models/mongo");

router.get('/',function(req,res){
    mongoD.findOne({user: req.session.email,status:"trash"},'Notes', function(err, result){
		if(err)
    throw err;
		if(result.length>0)
		{
            console.log("success"+result.length+"-"+result[0].title);
            res.render('trash',{"message":null,"data":result});
        }
        else{
            console.log("not Notes");
            res.render("trash",{"message":"No Trash here","data":null})
        }
	}); 
    })
router.get("/:id",function(req,res){
    console.log(req.params.id);
   
          mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),status:{$ne:"trash"}},{status:"trash"},'Notes', function(err, result){
              if(err)
          throw err;
          else{
              console.log("moved to trash!");
              res.redirect("/"); 
          }
      })
      })
      router.get("/forever/:id",function(req,res){
        console.log(req.params.id);
       
              mongoD.remove({_id: new mongodb.ObjectID(req.params.id),status:"trash"},'Notes', function(err, result){
                  if(err)
              throw err;
              else{
                  console.log("Deleted forever!");
                  res.redirect("/delete"); 
              }
          })
          })

          router.get("/restore/:id",function(req,res){
            console.log(req.params.id);
           
                  mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),status:"trash"},{status:"task"},'Notes', function(err, result){
                      if(err)
                  throw err;
                  else{
                      console.log("moved to task!");
                      res.redirect("/delete"); 
                  }
              })
              })
        
module.exports=router;