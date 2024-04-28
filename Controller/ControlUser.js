const User = require("../models/user.js");


// SIGN IN PAGE
module.exports.GetSign = (req,res) => {
    res.render("users/signin.ejs")
};

//SUCCESSFULL SIGNIN & LOGIN
module.exports.PostSign = async(req,res) => {
    try {
        let {username, email, password} = req.body;
        
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "New user created!");
            res.redirect("/listings");
        })

    } 
    catch (error) {
        req.flash("errors", error.message); 
        res.redirect("/signin");   
    }  
};

// lOGIN IN PAGE
module.exports.GetLogin = (req,res) => {
    res.render("users/login.ejs")
};

// LOGIN SUCCESSFUL
module.exports.PostLogin = async(req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


//  LOGOUT USER
module.exports.Logout = (req, res)=>{
    req.logOut((err) =>{
        if(err) {
          return next(err);
        }
        req.flash("success", "Successfully logged out.");
        res.redirect("/listings");
    });
}