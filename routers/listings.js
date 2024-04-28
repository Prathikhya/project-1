if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
// console.log(process.env.);
const express = require("express");
const router = express.Router();
const WrapAsync= require("../utils/WrapAsync.js");
const {isLoggedin, isOwner, validatinlisting} = require("../middleware.js")
const ListingControl = require("../Controller/ControlListing.js");
const multer  = require('multer')
const {storage} = require("../Cloudconfi.js");
const upload = multer({ storage });


// INDEX ROUTER
router.route("/")
.get(WrapAsync(ListingControl.AllListings))
.post(isLoggedin,
    upload.single("listing[image][url]"), 
    validatinlisting,
    WrapAsync(ListingControl.CreatedListing));

// CREATE NEW LISTING
router.get("/new", isLoggedin,(ListingControl.NewListing));

// FOR GETTING  SHOW DETAILS OF ALL
router.route( "/:id" )
.get( WrapAsync(ListingControl.AboutListing))
.put(isLoggedin, 
    isOwner, 
    upload.single("listing[image][url]"),
    validatinlisting,
    WrapAsync(ListingControl.UpdatedListing))
.delete( isLoggedin, isOwner, WrapAsync(ListingControl.DestroyListing));

// UPDATE THE EXISTING LISTS
router.get("/:id/edit",isLoggedin, isOwner, WrapAsync(ListingControl.EditListing));
module.exports = router;