//communcating with map-box api
const request = require('postman-request')
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFmZmFyMTE4NyIsImEiOiJja284aGxsYzQxZ3Q5Mm9yd2JmOGhsMXI3In0.eVta12D_Yp4onJxenwpPnw&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Sorry Unable to connect to the Internet');
        } else if (body.features.length === 0) {
            callback('Sorry Unable to find Location. Try new Search');
        } else if (body.features.length > 0) {
            const data = body.features[0];
            const geoData = data.center;
            const latitude = geoData[1];
            const longitude = geoData[0];
            const place_name = data.place_name;
            callback(undefined, { latitude: latitude, longitude: longitude, location: place_name });
        }
    })
}

module.exports = geoCode;