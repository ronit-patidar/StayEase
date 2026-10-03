const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require('../util/wrapAsync');
const Listing = require("../models/listing");
const Review = require('../models/review.js');
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controller/review.js');
// Reviews
// POST Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

// Delete ROUTE
// Delete Review Route
router.delete("/:reviewId",isReviewAuthor,isLoggedIn,wrapAsync(reviewController.destroyReview))
module.exports = router;