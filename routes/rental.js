const express = require('express');
const debug = require('debug')('app:routerRental');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

// Model
const { Rental, validate } = require('../model/rental');
const { Movie } = require('../model/movie');
const { Customer } = require('../model/customer');

router.get('/', async (req, res) => {
        res.send('rentals');
});

router.post('/', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('customer not found with the given ID');

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('movie not found with the given ID');
        console.log(movie);
        if (movie.numberInStock === 0) return res.status(400).send('No more in stock');

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        try {
            new Fawn.Task()
                .save('rentals', rental)
                .update('movies', { _id: movie._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();

            res.send(rental);
        } catch (ex) {
            res.status(500).send('Invalid trancaction...');
        }
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;