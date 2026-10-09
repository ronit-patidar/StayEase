const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema.js');

module.exports.isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to create or edit a listing!');
        return res.redirect('/login');
    }

    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing.owner.equals(res.locals.currUser.id)) {
        req.flash('error', 'You are not owner of this Listing!');
        return res.redirect(`/listings/${id}`);    
    }

    next();
}

// Validation for listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    
    if (error) {
        let errMsg = error.details.map(el => el.message).join(', ');
        console.log(`{!}---{ ${ errMsg } }---{!}`);
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// Validation for review
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map(el => el.message).join(', ');
        console.log(`{!}---{ ${ errMsg } }---{!}`);
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.currUser.id)) {
        req.flash('error', 'You are not author of this review!');
        return res.redirect(`/listings/${id}`);
    }

    next();
}

// Page titles
function setPageTitle(req, res, next) {
    let title = 'default title';
    let path = req.path;

    switch (path) {
        case '/listings':
            title = 'Listings';
            break;
        case '/listings/new':
            title = 'New form';
            break;
    }

    if (path.startsWith('/listings/')) {
        title = 'stayease-show';
    }

    res.locals.pageTitle = title;
    next();
}