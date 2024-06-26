const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
  res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
  try{
    let{username,email,password}=req.body;
    let newUser=new User({username,email});
    let registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","Welcome to Wanderlust!");
      res.redirect("/listings");
    })
  } catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
  }
}
module.exports.renderLoginForm=(req,res)=>{
  res.render("users/login.ejs");
}
module.exports.login=async(req,res)=>{
  req.flash("success","Welcome to Wanderlust! You are logged in");
  let redirecturl=res.locals.redirectUrl || "/listings";
  res.redirect(redirecturl);
}
module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you're logged out!");
    res.redirect("/listings");
  });
}