var express=require("express");
var router=express.Router();

router.get("/",function(req,res){

    req.session.destroy();
  console.log("logout");
    res.redirect("/login");
  })

module.exports=router;