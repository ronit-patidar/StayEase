const Listing = require('../models/listing.js');
const getGeoData = require('../utils/geoData.js');

module.exports.index = async (req, res) => {
    const { category, location } = req.query;
    
    let query = {};
    
    if (category) {
        query.category = category;
        
    } else if (location) {
        const searchWords = location.split(" ");

        const allQueries = searchWords.map(word => ({
            $or: [
                { location: new RegExp(word, 'i') },
                { country: new RegExp(word, 'i') }
            ]
        }));

        query.$or = allQueries;
    }
    
    const allListings = await Listing.find(query);
    
    if (location && allListings.length === 0) {
        req.flash('warning', `We couldn't find any listings for "${location}". Try another spot!`);
        return res.redirect('/listings');
    }
    
    res.render("listings/index", { allListings, selectedCategory: category });
}

module.exports.newListing = (req, res) => {
    res.render('listings/new');
}

module.exports.createListing = async (req, res) => {
    let listing = req.body.listing;
    let geometry = await getGeoData(listing.location, listing.country);

    if (!geometry) {
        req.flash('error', 'Location not found! Please check the spelling or Country.');
        return res.redirect('/listings/new');
    }

    let imageUrl = req.file.path;
    let imageFilename = req.file.filename;

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url: imageUrl, filename: imageFilename };
    newListing.geometry = geometry;
    
    await newListing.save();
    console.log(newListing);

    req.flash('success', 'New listing created! It is now live and visible to everyone.');
    res.redirect('/listings');
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('owner');
    if (!listing) {
        req.flash('error', 'Error! The listing you requested does not exist or was deleted.');
        return res.redirect('/listings');
    }
    
    // console.log(listing);
    res.render('listings/show', { listing });
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Error! The listing you requested does not exist or was deleted.');
        return res.redirect('/listings');
    }

    res.render('listings/edit', { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    let existingListing = await Listing.findById(id);

    if (
        existingListing.location !== listing.location ||
        existingListing.country !== listing.country
    ) {
        let geometry = await getGeoData(listing.location, listing.country);

        if (!geometry) {
            req.flash('error', 'Location not found! Please check the spelling or Country.');
            return res.redirect(`/listings/${id}/edit`);
        }

        listing.geometry = geometry;
    }
    
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    listing = await Listing.findByIdAndUpdate(id, { ...listing }, { new: true } );

    console.log(listing);

    req.flash('success', 'Listing updated! Your latest changes are now live on the website.');
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    req.flash('success', 'Listing deleted! It has been successfully removed from your collection.');
    res.redirect('/listings');
}