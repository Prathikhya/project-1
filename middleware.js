const Listing = require("./models/Listing");
const ExpressError = require("./utils/Expresserror.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const reviews = require("./models/reviews");

module.exports.isLoggedin = (req, res, next) => {   
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("please login first");
       return res.redirect( "/login" );
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{ 
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "Sorry,you do not have the permission!");
        return res.redirect(`/listings/${id}`);
    } //my flash message is not working properly
    next();
}


// validation middleware for router
module.exports.validatinlisting = (req,res,next) => {
    let {error}  = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    };
}


// validation middleware for REVIEW ROUTER
module.exports.validatereview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.isreviewAuthor = async (req,res,next)=>{
    let {reviewsId, id} = req.params;
    let review = await reviews.findById(reviewsId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "Sorry,you do not have the permission!");
        return res.redirect(`/listings/${id}`);
    } //my flash message is not working properly
    next();
}