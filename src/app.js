// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPaths = path.join(__dirname, '../templates/partials')
const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths);
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Jaffar Sharieff.'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jaffar Sharieff.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How may I help you',
        name: 'Jaffar Sharieff.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'You must provide an address!'
        });
        return;
    }
    // console.log(req.query.address);

    geoCode(req.query.address, (error, data) => {
        if (error) {
            res.send({ error })
            return;
        }

        const { latitude, longitude, location } = data
        forecast(latitude, longitude, location, (error, data) => {
            if (error) {
                res.send({ error })
                return;
            }
            console.log(data)
            res.send({
                data,
                location,
                address: req.query.address
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide search term'
        })
        return;
    }
    console.log(req.query);
    res.send({
        products: []
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jaffar Sharieff.',
        errorMessage: 'Page Not Found.'
    })
})
app.listen(3000, () => {
    console.log(`Server is Up and Running`)
})