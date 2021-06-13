
const request = require('request');

const forecast = (latitude, longitude, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=5836195707894a08ed8a1bbfe7aa3b11&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'

    request({ url, json: true }, (error, { body } = {}) =>
    {
        if (error)
        {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error)
        {
            callback('Unable to find location! Try Another Search', undefined)
        } else
        {
            const result = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'
            callback(undefined, result)
        }
    })
}
module.exports = forecast
