const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const ExpressError = require("./utils/Expresserror.js");
const methodoverride = require("method-override");
const ejs = require("ejs-mate");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const ListingRouter = require("./routers/listings.js");
const ReviewsRouter = require("./routers/reviews.js");
const UserRouter = require("./routers/user.js");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local");
const mongoUrl = process.env.ATLASDB_URL;

// apps set and use parts
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine( "ejs",ejs);


// momgodb database connection partm 
main()
    .then(() => {console.log("connect connected");
})
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}

const store  = MongoStore.create({
  mongoUrl: mongoUrl,
  crypto: {
    secret: process.env.SECRET_CODE
  },
  ttl: 7 * 24 * 60 * 60,
});

store.on("error", () => {
  console.log("error in mongo session store", err)
});

const sessionOption = {
  store: store,
  secret: process.env.SECRET_CODE,
  resave:  false,
  saveUninitialized: true,
  Cookie:{
    expires: Date.now() + 7  * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 1000, // 7 days in milliseconds
    httpOnly :true,
  }
}

// API ROUTERS PARTS
// app.get("/",(req,res) => {
//     res.render('/listings', ListingRouter);
// });

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.errors = req.flash("errors");
  res.locals.currentUser = req.user;
  next();
})

// ROUTERS LISTINGS 
app.use('/listings', ListingRouter);
app.use('/listings/:id/reviews', ReviewsRouter);
app.use("/", UserRouter);

// error handling
app.all("*",(req,res,next) => {
   next(new ExpressError(404, "page not found"));
})

app.use((err, req, res, next) => {
    // console.error(err.statusCode);
    let {statusCode = 500,message = "something went wrong"}= err;
    // console.log(err.name);
    res.status(statusCode).render("error.ejs",{message});
  });

app.listen(port,() => {
    console.log("server is working.");
});