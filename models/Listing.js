const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;


const ListingSchema = new Schema({
    title: {
        type: String,
        default: "Untitled",
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "Untitled",
            required: true
        },
        url: {
            type: String,
            default: "https://mapetitecoree.com/cdn/shop/articles/army-sejati-yuk-kenalan-sama-karakter-bt21-karya-member-bts-m3UeiIGJLd.jpg?v=1672451852",
            set: v => v ===  "" ? "https://mapetitecoree.com/cdn/shop/articles/army-sejati-yuk-kenalan-sama-karakter-bt21-karya-member-bts-m3UeiIGJLd.jpg?v=1672451852 " 
            : v, 
            required: true,
        },// Change the type to String
        
    },
    
    price: {
        type: Number,
            default: 0, // Set default value to 0
            required: true,
    },
    location: {
        type: String,
        default: "Untitled",
        required: true,
    },
    Country: {
        type: String,
        default: "Untitled",
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
});

ListingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;