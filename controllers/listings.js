const Listing=require("../models/listing");

//Index route
module.exports.index=async(req,res) =>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings})};

//New Listing
module.exports.rendernewForm=(req,res) =>{
    res.render("listings/new.ejs")};
    

//Show route
module.exports.showListing=async(req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate: { path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exist");
        res.redirect("/listings");
        return res.redirect("/listings");  //new change
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing})};


//Create Route
module.exports.createListing=async(req,res,next) =>{
    let url=req.file.path;
    let filename=req.file.filename;

    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};    
    await newListing.save();
    req.flash("success", "new listing created!!");
    res.redirect("/listings")};

//Edit Listing
module.exports.rendereditForm=async(req,res) =>{
     let {id}= req.params;
     const listing=await Listing.findById(id);
      if(!listing){
        req.flash("error","listing you requested for does not exist");
        return res.redirect("/listings");
    }
    // console.log(listing);    
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl})};

//Update route
module.exports.updateListing=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.country = req.body.listing.country;
  listing.location = req.body.listing.location;

  if(req.file){
    listing.image={
        url: req.file.path,
        filename: req.file.filename
    }
  }

  await listing.save();
  req.flash("success","Listing updated");
  res.redirect(`/listings/${id}`)};

//Delete listing
module.exports.destroyListing=async(req,res) =>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings")};

    