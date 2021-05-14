const request = require('postman-request');
const chalk = require('chalk')
const forecast = (latitude, longitude, location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5d19a88fb5fb168551878d22b52de1bf&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Sorry Unable to connect to the Internet');
        } else if (body.error) {
            callback('Sorry Unable to find Location. Try new search');
        } else if (!body.error) {
            const data = body.current;
            let temperature = (data.temperature - 32) * 5 / 9;
            temperature = temperature.toFixed();
            let feelslike = (data.feelslike - 32) * 5 / 9;
            feelslike = feelslike.toFixed();
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${temperature} degrees celsius out, But it feels like ${feelslike} degrees celsius out.`);
            // callback(undefined, {
            //     location,
            //     forecast: data.weather_descriptions[0],
            //     temperature,
            //     feelslike
            // });
        }
    })
}

module.exports = forecast;