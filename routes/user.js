const express=require("express");
const router=express.Router(); 
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveredirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");


router.route("/signup")
.get(userController.rendersignupForm)      //render signup form
.post(wrapAsync(userController.signup))   //signup route


//login Routes
router.route("/login")
.get(userController.renderloginForm)      //render login form
.post(saveredirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}),userController.login)  //login route


//logout user
router.get("/logout",userController.logout);

module.exports=router;