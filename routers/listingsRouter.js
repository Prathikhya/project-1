if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
// console.log(process.env.);
const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validatinlisting} = require("../middleware/middleware.js");
const ListingControl = require("../controllers/listingController.js");
const multer  = require('multer')
const {storage} = require("../config/cloudinary.js");
const upload = multer({ storage });


// INDEX ROUTER
router.route("/")
.get(wrapAsync(ListingControl.AllListings))
.post(isLoggedin,
    upload.single("listing[image][url]"), 
    validatinlisting,
    wrapAsync(ListingControl.CreatedListing));

// CREATE NEW LISTING
router.get("/new", isLoggedin,(ListingControl.NewListing));

// FOR GETTING  SHOW DETAILS OF ALL
router.route( "/:id" )
.get( wrapAsync(ListingControl.AboutListing))
.put(isLoggedin, 
    isOwner, 
    upload.single("listing[image][url]"),
    validatinlisting,
    wrapAsync(ListingControl.UpdatedListing))
.delete( isLoggedin, isOwner, wrapAsync(ListingControl.DestroyListing));

// UPDATE THE EXISTING LISTS
router.get("/:id/edit",isLoggedin, isOwner, wrapAsync(ListingControl.EditListing));

module.exports = router;