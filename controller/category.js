
const listings = require("../models/listing");




module.exports.renderCategory = async(res,req)=> {
    

    // Route to render posts by category
    const category = req.params.category;
    console.log('req.params:', category); 
      const listing = await listings.find({ category });
  
    //   if (!listing || listing.length === 0) {
    //     return res.status(404).send("No listings found for this category.");
    //   }
    //   return res.render("../views/listings/category.ejs", { category, listing });
  
    
}


