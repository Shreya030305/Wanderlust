//to segregate the listings and review routes
const express=require("express");
const router=express.Router();  // router object
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))                   //Index route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));    //Create Route


//Create a new listing
router.get("/new",isLoggedIn,listingController.rendernewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))    //show route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing))     //update
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));    //delete


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.rendereditForm));


module.exports=router;