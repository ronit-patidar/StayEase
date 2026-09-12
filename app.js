const express = require("express");
const app = express();
const port = 8080;

// setting up ejs
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ejsMate = require('ejs-mate');
app.engine("ejs",ejsMate);
// This tells Express how to render .ejs files using a specific rendering function called ejsMate.


app.use(express.static(path.join(__dirname,"/public")));
// This line tells Express to serve static files from your public folder.

// to access req.body
app.use(express.json());
//Express middleware used to read data sent from an HTML <form> using POST.
app.use(express.urlencoded({extended:true}));


const mongoose = require("mongoose");


const Listing = require("./models/listing");


const MONGO_URL="mongodb+srv://yt:cozt7rUa9fEAcjhI@cluster0.wwa2xdo.mongodb.net/stayease"
async function main(){
  await mongoose.connect(MONGO_URL);
}
main().then(()=>{
  console.log("Connected to DB");
}).catch(err=>{
  console.log(err);
})


app.get('/',(req,res)=>{
  res.send("Hi,I am root");
})


// Index Route
app.get('/listings',async (req,res)=>{
  const allListing = await Listing.find({});
  res.render("listings/index.ejs",{allListing});
})


// New Route
app.get('/listings/new',(req,res)=>{
  res.render("listings/new.ejs");
})


// Show Route
app.get('/listings/:id',async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
})

// Create Route 
app.post('/listings',async(req,res)=>{
  const newListing = new Listing (req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

// Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  // let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  res.redirect("/listings");
})




// app.get("/testListing",async(req,res)=>{
//   let samplelisting = new Listing({
//     title:"My new villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangute,Goa",
//     country:"India",
//   });
//   await samplelisting.save();
//   console.log("sample was saved");
//   res.send("Successfull testing")
// })



app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
})