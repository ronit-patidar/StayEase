const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");

const seedUsers = require("./seedUsers");
const seedListingsAndReviews = require("./seedListingsAndReviews.js");

async function init() {
  if (!process.env.ATLASDB_URL) {
    throw new Error("ATLASDB_URL is not set. Check your .env file location and variable name.");
  }

  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("🔌 DB Connected");

  const users = await seedUsers();
  await seedListingsAndReviews(users);

  await mongoose.connection.close();
  console.log("🔒 DB Connection closed");
}

init().catch(err => {
  console.error(err);
  mongoose.connection.close();
});