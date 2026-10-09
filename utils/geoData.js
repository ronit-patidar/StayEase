async function getGeoData(location, country) {
    let query = `${location},${country}`;
    let nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    let response = await fetch(nominatimUrl, {
        headers: {
            'User-Agent': 'stayease-App-v1.0' 
        }
    });
    let data = await response.json();

    if (data.length === 0) return null;

    return geometry = {
        type: 'Point',
        coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
    };
}

module.exports = getGeoData;