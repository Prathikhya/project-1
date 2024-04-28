const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/Listing.js");
const WrapAsync= require("../utils/WrapAsync.js");
const Reviews = require("../models/reviews.js");
const {validatereview,isLoggedin, isreviewAuthor} = require("../middleware.js");
const ReviewControl = require("../controller/ControlReview.js");


// REVIEWS ROUTER
router.post("/", isLoggedin, validatereview, (ReviewControl.AddReview));

// DELETE REVIEW ROUTER WITH LISTINGS
    router.delete("/:reviewsId", isLoggedin,
    isreviewAuthor,
    WrapAsync(ReviewControl.DestoryReviewAndListing));


    module.exports = router;