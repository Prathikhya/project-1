const Listing = require("../models/Listing.js");

// INDEX ROUTER
module.exports.AllListings = async (req,res) =>{
    let listing = await Listing.find();

    res.render("./mainli/index.ejs",{listing});
};

// CREATE NEW LISTING(GET)
module.exports.NewListing = (req,res) =>{
    res.render("./mainli/new.ejs");
}

// FOR GETTING  SHOW DETAILS OF ALL
module.exports.AboutListing = async (req,res) =>{
    let {id} = req.params;
    
    const listing = await Listing.findById(id).
    populate({
        path: "reviews",
        populate:{
            path:"author",
        },
    }).
    populate("owner");
    if(!listing){
        req.flash("errors" , "No listings found!");
        res.redirect("/listings");
    }
    res.render("./mainli/details.ejs",{listing});
    
}

// create a ROUTER PART-
module.exports.CreatedListing=async (req,res,next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    const test = new Listing (req.body.listing);
    test.owner = req.user._id;
    test.image = {url, filename};
    await test.save();
    req.flash( "success","Listing Created!");
    res.redirect("/listings");
    
}

// UPDATE THE EXISTING LISTS(GET)
module.exports.EditListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("errors" , "No listings found!");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload", "/upload/h_300,w_250");

    res.render("./mainli/edit.ejs",{listing, originalImage});
}

// UPDATE THE EXISTING LISTS(PUT)
module.exports.UpdatedListing = async (req, res) => {
    if(!req.body.listing){
        next(new ExpressError(400,"send400, valid data"));
    } 
    let { id } = req.params;
    let findme = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file != undefined ) {
    let url = req.file.path;
    let filename = req.file.filename;
    findme.image = {url, filename};
    await findme.save();
    req.flash( "success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}}

// DELETE A LISTING
module.exports.DestroyListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash( "success","Listing Deleted!");
    res.redirect("/listings");
}