const express = require('express');
const genre = require('../routes/genre');
const movie = require('../routes/movie');
const customer = require('../routes/customer');
const rental = require('../routes/rental');
const user = require('../routes/user');
const auth = require('../routes/auth');
const err = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genre);
    app.use('/api/movies', movie);
    app.use('/api/customers', customer);
    app.use('/api/rentals', rental);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    // err is the last middleware used to catch erros
    app.use(err);
}