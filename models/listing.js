const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title:{
    type : String,
    required : true
  },
  description:String,
  image:{
    type:String,
    default:"https://plus.unsplash.com/premium_photo-1734607187702-0aa7ca24eac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set:(v) => v === "" ? "https://plus.unsplash.com/premium_photo-1734607187702-0aa7ca24eac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
  },
  price:Number,
  location:String,
  country:String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref : "review",
    }
  ]
});

listingSchema.post("findOneAndDelete",async(listing) => {
  if(listing){
    await review.deleteMany({_id:{ $in: listing.reviews }});
  }
});



const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;