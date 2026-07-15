const express = require("express");
const router = express.Router({ mergeParams: true });
// const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware/middleware.js");
const UserControl = require("../controllers/userController.js");

router.route("/signup")
.get((UserControl.GetSign))
.post( wrapAsync(UserControl.PostSign));

router.route("/login")
.get( (UserControl.GetLogin))
.post( saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),(UserControl.PostLogin) );

router.get("/logout",(UserControl.Logout));

module.exports = router;


