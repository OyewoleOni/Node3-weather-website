//importing the core modules
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//importing the NPM modules
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Set Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather',
        name: 'Oni Oyewole'
    })
});

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About Me',
        name: 'Oni Oyewole'
    })
});

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help',
        helpText: 'This is the help page',
        name: 'Oni Oyewole'

    })
})

app.get('/weather', (req, res) =>
{

    if (!req.query.address)
    {
        return res.send({
            error: 'An address must be provided!'
        });
    }
    let address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) =>
    {
        if (error)
        {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
            {
                return res.send({ error })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })

    })

    // res.send({
    //     forecast: 'The temperatures degree is 30 degrees',
    //     location: 'Lagos, Nigeria',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) =>
{

    if (!req.query.search)
    {
        return res.send({
            error: 'A search term must be provided'
        });
    }

    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) =>
{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Oni Oyewole'
    })
})

app.get('*', (req, res) =>
{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Oni Oyewole'
    })
});

app.listen(port, () =>
{
    console.log('listening on port ' + port + '.....')
});