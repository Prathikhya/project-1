const Joi = require("joi");
const eviews = require("./models/reviews");

 module.exports.listingSchema = Joi.object({
    listing: Joi.object(
        {
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.object({
                filename: Joi.string().required(),
                url: Joi.string().allow("",null),
            }).required(),
            price: Joi.number().required().min(0),
            location: Joi.string().required(),
            Country: Joi.string().required(),
        }).required()
})

// module.exports.reviewSchema = Joi.object({
//     comment: Joi.string().required(),
//     rating: Joi.number().required().min(1).max(5)
// });

module.exports.reviewSchema = Joi.object({
    reviews: Joi.object(
        {
            
            rating: Joi.number().required().min(1).max(5),
            comment: Joi.string().required(),
            
            
        }).required()
    });