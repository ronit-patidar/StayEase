require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=geojson&limit=1&q=${encodeURIComponent(address)}`;
    const res = await fetch(url, {
        headers: { "User-Agent": "StayEase/1.0 (ronitpatidar01@gmail.com)" }
    });

    if (!res.ok) {
        throw new Error(`Nominatim returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    return data.features[0]?.geometry;
}

(async () => {
    await mongoose.connect(process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/stayease"); // match your app.js
    const listings = await Listing.find({});

    for (const l of listings) {
        if (l.geometry?.coordinates?.length === 2) continue;

        try {
            const geometry = await geocode(`${l.location}, ${l.country}`);
            if (geometry) {
                // updateOne skips full-document validation, so the missing "category" doesn't block it
                await Listing.updateOne({ _id: l._id }, { $set: { geometry } });
                console.log("Updated:", l.title);
            } else {
                console.log("Not found:", l.title);
            }
        } catch (err) {
            console.log("Failed:", l.title, "-", err.message);
        }

        await new Promise((r) => setTimeout(r, 1100)); // Nominatim: 1 request/second
    }

    await mongoose.connection.close();
})();