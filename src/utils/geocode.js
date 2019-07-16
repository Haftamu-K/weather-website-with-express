const request = require('request');

function geocode( address, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaGFmdGlzaCIsImEiOiJjanhsdjd6ZHkwMGtxM29ta2ozejBzMXVtIn0.owIN6UC6AGXi02FQifG-8Q&limit=1";
    request({url, json : true}, (error, res, body) => {
        if(error) {
            callback("Unable to connect to location services!!!", null);
        } else if( !res.body.features.length) {
            callback("Unable to find location. Try another search.", null);
        } else {
            callback(null, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name,
            });
        }
    });
}

module.exports = geocode;