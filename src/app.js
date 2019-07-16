const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/weather');
const geocode = require('./utils/geocode');

const app = express();

//Define path for express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templetes/views');
const partialsDirectoryPath = path.join(__dirname,'../templetes/partials');

//Setup handlebars engine and partials and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather",
        name : "Haftamu",
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About",
        name : "Haftamu",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : "Help",
        message : "Go to the toilet.",
        name : "Haftamu",
    })
})

app.get('/Weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error : "You must provide address term",
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({ error });
        }

        forecast(data, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast : forecastData,
                location : data.location,
                address : req.query.address,                
            });
            console.log(data);
        });
    });
    
});


app.get('/help/*', (req, res) => {
    res.render('pageError', {
        title : "404",
        message : "Help article not found",
        name : "Haftamu",
    })
})

app.get('*', function (req, res) {
    res.render('pageError', {
        title : "404",
        message : "page not found",
        name : "Haftamu",
    }) 
})

app.listen( 3000, () => {
    console.log('This app is served in a port 3000');
})