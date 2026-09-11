const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL="mongodb+srv://yt:cozt7rUa9fEAcjhI@cluster0.wwa2xdo.mongodb.net/stayease"
async function main(){
  await mongoose.connect(MONGO_URL);
}
main().then(()=>{
  console.log("Connected to DB");
}).catch(err=>{
  console.log(err);
})
const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
}
initDB();
