var express=require("express");
var router=express.Router();


function backdoor(req,res,next){
        
    if(!req.session.is_user_logged_in)
    {
      res.redirect("/login");
    }
  else{
    next();
  }
  }

router.use("/signup",require("./signup"));
router.use("/login",require("./login"));
router.use("/forget",require("./forget"));
router.use("/logout",backdoor,require("./logout"));
router.use("/pin",backdoor,require("./pin"));
router.use("/archive",backdoor,require("./archive"));
router.use("/delete",backdoor,require("./delete"));
router.use("/",backdoor,require("./home"));


console.log("hiii")

module.exports=router;