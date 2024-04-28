const Listing = require("../models/Listing.js");
const Reviews = require("../models/reviews.js");


// ADDING A REVIEW
module.exports.AddReview = async (req, res) => {
    let mylist = await Listing.findById(req.params.id);
    let newreview = new Reviews(req.body.reviews);
    newreview.author = req.user._id;
    let {id} = req.params;
    mylist.reviews.push(newreview);
    await newreview.save();
    await mylist.save();
    req.flash( "success","Review Created!");
    res.redirect(`/listings/${id}`);
}

// DELETE REVIEW ROUTER WITH LISTINGS

module.exports.DestoryReviewAndListing = async(req,res) => {
    let {id , reviewsId} = req.params;
    await  Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewsId}});
    await Reviews.findByIdAndDelete(reviewsId);
    req.flash( "success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}