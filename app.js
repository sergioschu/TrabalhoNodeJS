const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

/*mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });*/

require('./api/models/user');
require('./api/models/person');
require('./api/models/address');

const app = express();

const userRoutes = require('./api/routes/users');
const personRoutes = require('./api/routes/persons');
const addressRoutes = require('./api/routes/address');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./api/config/passport')(passport);
app.use(passport.initialize());

/*const cors = (req, res, next) => {
    const whitelist = [
        '177.107.124.90'
    ];
    const origin = req.header.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'token,Content-Type,Authorization, x-access-token');
    next();
}
app.use(cors);*/

app.use('/api/users', userRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/address', addressRoutes);

app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'Hello word!'
    })
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;