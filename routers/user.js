const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserControl = require("../Controller/ControlUser.js");

router.route("/signin")
.get((UserControl.GetSign))
.post( WrapAsync(UserControl.PostSign));

router.route("/login")
.get( (UserControl.GetLogin))
.post( saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),(UserControl.PostLogin) );

router.get("/logout",(UserControl.Logout));

module.exports = router;
