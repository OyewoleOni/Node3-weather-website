const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)  + '.json?access_token=pk.eyJ1Ijoib25pb3lld29sZTE5MTAiLCJhIjoiY2pzcm1yZmxnMGg2czQ0czltNW90M25sMSJ9.tn_vEt25syB3KRQg4fMzVg&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the geolocation service!', undefined)
        } else if(body.features.length  === 0){
            callback('Unable to find location! Try Another Search', undefined)
        } else{
            const data = {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            }
            callback(undefined, data)
        }
                
    })
}

module.exports = geocode;