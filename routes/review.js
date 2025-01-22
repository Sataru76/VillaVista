const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
let { reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing,isReviewauthor } = require("../middleware.js");
const { deleteReview } = require("../controller/reviews.js");
let ReviewController = require("../controller/reviews.js");

//server side validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//For Review Model
//create review / Post route
router.post("/reviews", isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));
//delete review route
router.delete("/reviews/:reviewId",isLoggedIn,isReviewauthor, wrapAsync(ReviewController.deleteReview));
 
module.exports = router;

