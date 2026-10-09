const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.addReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    // console.log(newReview);
    await listing.save();
    
    req.flash('success', 'New review added! Thank you for sharing your experience with us.');

    res.redirect(`/listings/${listing.id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id , reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Success! The review has been permanently deleted from this listing.');

    res.redirect(`/listings/${id}`);
}