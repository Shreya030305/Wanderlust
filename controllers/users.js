const User=require("../models/user.js");


//SignUp form
module.exports.rendersignupForm=(req,res) =>{
    res.render("users/signup.ejs")};


//SignUp route
module.exports.signup=async(req,res) =>{
    try{
         let {username, email, password}=req.body;
        const newUser=new User({email,username});
        const registeredUser= await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        });
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

//Login Form
module.exports.renderloginForm=(req,res) =>{
    res.render("users/login.ejs")};

//Login
module.exports.login=async(req,res) =>{
    req.flash("success","Welcome to WanderLust, You are logged in!!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)};

//Logout
module.exports.logout=(req,res,next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}