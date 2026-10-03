require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6abf816472a3ff3cfc64e6e2"
  }));

  await Listing.insertMany(initData.data);

  console.log("data was initialized");
};

main()
  .then(async () => {
    console.log("Connected to DB");
    await initDB();
    await mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });