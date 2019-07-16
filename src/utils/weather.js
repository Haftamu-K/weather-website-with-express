const request = require('request');

const forecast = (geocode, callback) => {
    const url = `https://api.darksky.net/forecast/62a423018add2791498ed697b416a17b/${geocode.latitude},${geocode.longitude}?units=si`;
    const option = {
        url,
        json : true,
    }

    request(option, (err, res, body) => {
        if(err) {
            callback("Unabel to connect to weather service", undefined);
        } else if(res.body.error) {
            callback("Coordinate error.", undefined);
        } else {
            callback(null, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " chance of raining.");
            // callback(null, {
            //     summary : body.currently.summary,
            //     temperature : body.currently.temperature,
            //     rainChance : body.daily.data[0].precipProbability,
            //     timezone :   body.timezone 
            // })
        }
    });
}

module.exports = forecast;