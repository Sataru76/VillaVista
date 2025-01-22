const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const listings = require("../models/listing");



router.post("/",async(req,res)=>{
    // console.log(req.query.search);
    const nameQuery = req.body.search;
    console.log(nameQuery);

 const results = await listings.find({ location: new RegExp(nameQuery, "i") });
 console.log(results);

    res.render("../views/listings/search.ejs", { results });
    // const alistings=await 

});




module.exports = router;
