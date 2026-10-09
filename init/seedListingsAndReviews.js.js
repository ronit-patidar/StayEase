const Listing = require("../models/listing");
const Review = require("../models/review");

const listingsData = require("./advanceData/listings");
const reviewsData = require("./advanceData/reviews");

const { cloudinary } = require("../cloudConfig");

/* ===================== HELPERS ===================== */

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/* ===================== SEED FUNCTION ===================== */

async function seedListingsAndReviews(users) {
  console.log("🏠 Seeding listings & reviews...");

  // DEV ONLY cleanup
  await Listing.deleteMany({});
  await Review.deleteMany({});
  console.log("🧹 Old listings & reviews removed");

  const createdListings = [];

  for (let listingData of listingsData) {
    const listingReviews = [];

    /* ---------- IMAGE UPLOAD ---------- */
    const uploadResponse = await cloudinary.uploader.upload(
      listingData.imageUrl,
      { folder: "stayease" }
    );

    /* ---------- CREATE LISTING ---------- */
    const owner = getRandom(users);

    const listing = new Listing({
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      category: listingData.category,
      location: listingData.location,
      country: listingData.country,
      geometry: listingData.geometry,
      owner: owner._id,
      image: {
        url: uploadResponse.secure_url,
        filename: uploadResponse.public_id,
      },
    });

    /* ---------- CREATE REVIEWS ---------- */

    // 1️⃣ Random review count (8–12)
    const reviewCount = getRandomInt(8, 12);

    // 2️⃣ Exclude owner from reviewers
    const eligibleUsers = users.filter(
      user => user._id.toString() !== owner._id.toString()
    );

    // 3️⃣ Shuffle users
    const shuffledUsers = shuffleArray(eligibleUsers);

    // 4️⃣ Pick reviewers (safe clamp)
    const selectedReviewers = shuffledUsers.slice(
      0,
      Math.min(reviewCount, shuffledUsers.length)
    );

    for (let reviewer of selectedReviewers) {
      const reviewData = getRandom(reviewsData);

      const review = new Review({
        comment: reviewData.comment,
        rating: reviewData.rating,
        author: reviewer._id,
      });

      await review.save();
      listingReviews.push(review._id);
    }

    listing.reviews = listingReviews;

    await listing.save();
    createdListings.push(listing);

    console.log(`✅ Created listing: ${listing.title}`);
  }

  console.log(`🎉 ${createdListings.length} listings created`);
  return createdListings;
}

module.exports = seedListingsAndReviews;
