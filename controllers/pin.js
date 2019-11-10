var express=require("express");
var mongodb = require('mongodb');
var router=express.Router();
var mongoD = require("../models/mongo");

router.get("/:id",function(req,res){
  console.log(req.params.id);
  mongoD.findOne({_id: new mongodb.ObjectID(req.params.id)},'Notes', function(err, result){
    if(err)
throw err;
    if(result[0].pin=="pin")
    {
       
        mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),pin:"pin"},{pin:"unpin"},'Notes', function(err, result){
            if(err)
        throw err;
        else{
            console.log("pin changed to unpin");
            res.redirect("/"); 
        }
    })
    
    }
    else{
        mongoD.updateWhere({_id: new mongodb.ObjectID(req.params.id),pin:"unpin"},{pin:"pin"},'Notes', function(err, result){
            if(err)
        throw err;
        else{
            console.log("unpin changed to pin");
            res.redirect("/"); 
        }
    })
    }
}); 
  })

module.exports=router;