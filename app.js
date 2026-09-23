require('dotenv').config();
const express = require("express");
const app = express();
const port = 8080;

const Review = require('./models/review.js');
const wrapAsync = require("./util/wrapAsync");
const ExpressError = require("./util/ExpressError");
const {listingSchema,reviewSchema} = require('./schema.js');
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

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


async function main(){
  await mongoose.connect(process.env.MONGO_URI);
}
main().then(()=>{
  console.log("Connected to DB");
}).catch(err=>{
  console.log(err);
})


app.get('/',(req,res)=>{
  res.send("Hi,I am root");
})



app.use('/listings',listings);
app.use('/listings/:id/reviews',reviews);




app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});
app.use((err,req,res,next)=>{
  const {statusCode=500,message="Something went wrong"} = err;
  // res.status(statusCode).send(message);
  res.render("error.ejs",{err});
})

app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
})