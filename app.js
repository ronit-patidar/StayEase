require('dotenv').config();
const express = require("express");
const app = express();
const port = 8080;

const Review = require('./models/review.js');
const wrapAsync = require("./util/wrapAsync");
const ExpressError = require("./util/ExpressError");
const {listingSchema,reviewSchema} = require('./schema.js');

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

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

const sessionOptions = {
  secret  : "my supersecretcode",
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge : 1000 * 60 * 60 * 24 * 3,
    httpOnly : true
  }
}
app.get('/',(req,res)=>{
  res.send("Hi,I am root");
})


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");  
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

// app.get("/demouser",async(req,res) => {
//   let fakerUser = new User({
//     email : "student@gmail.com",
//     username : "delta-student",
//   })
//   let registeredUser = await User.register(fakeUser,"helloworld");
//   res.send(registeredUser);
// })


async function main(){
  await mongoose.connect(process.env.MONGO_URI);
}
main().then(()=>{
  console.log("Connected to DB");
}).catch(err=>{
  console.log(err);
})




app.use('/listings',listingsRouter);
app.use('/listings/:id/reviews',reviewsRouter);
app.use('/',userRouter);




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