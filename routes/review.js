const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const {
    validateReview,
    isLoggedIn,
    isReviewAuthor
} = require('../middleware.js');

const reviewController = require('../controllers/reviews.js');

// Post Route :-
router.post(
    '/',
    isLoggedIn,
    validateReview,
    reviewController.addReview
);

// Delete Route :-
router.delete(
    '/:reviewId',
    isLoggedIn,
    isReviewAuthor,
    reviewController.deleteReview
);

module.exports = router;