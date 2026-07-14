const express = require("express");
const router = express.Router({ mergeParams: true });
// const Listing = require("../models/Listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
// const Reviews = require("../models/reviews.js");
const {validatereview,isLoggedin, isreviewAuthor} = require("../middleware/middleware.js");
const ReviewControl = require("../controllers/reviewController.js");


// REVIEWS ROUTER
router.post("/", isLoggedin, validatereview, (ReviewControl.AddReview));

// DELETE REVIEW ROUTER WITH LISTINGS
    router.delete("/:reviewsId", isLoggedin,
    isreviewAuthor,
    wrapAsync(ReviewControl.DestoryReviewAndListing));


    module.exports = router;