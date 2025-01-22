const { findById } = require("./models/review");
const listings = require("./models/listing.js");
const Review= require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
let { listingSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "You must be logged in to access this page");
        res.redirect("/login");
    }
    next();

}



module.exports.saveRedirectUrl = (req, res, next) => {

    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;

    }

    next();


}


module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;
    let Listing = await listings.findById(id);

   
    if (!Listing.owner._id.equals(res.locals.currUser._id)) {router.get('/:category', (req, res) => {
        console.log('req.params:', req.params); // Should log { category: '<value>' }
        res.send(`Category: ${req.params.category}`);
    });

    

        req.flash("error", "You are not the Owner of listing");
        return res.redirect(`/listings/${id}`);

    }
    if(!Listing.owner._id){
        req.flash("error", "You are not the Owner of listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewauthor = async (req, res, next) => {

    let { reviewId,id } = req.params;
    let review = await Review.findById(reviewId);  
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");

        throw new ExpressError(400, error);

    } else {
        next();

    }
}