//to segregate the listings and review routes
const express=require("express");
const router=express.Router({mergeParams: true});  // router object
const wrapAsync=require("../utils/wrapAsync.js"); 
const ExpressError=require("../utils/expressError.js");  
const Review=require("../models/review.js");
const Listing=require("../models/listing");
const {reviewSchema}=require("../schema.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//Reviews         //POST route
router.post("/",validateReview ,isLoggedIn,wrapAsync(reviewController.createReview));


//Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;
