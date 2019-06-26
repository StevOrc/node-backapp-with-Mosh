const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routeMovie');
const { Movie, validate } = require('../model/movie');
const { Genre } = require('../model/genre');

router.get('/', async (req, res) => {
        const movies = await Movie.find().sort('name');
        debug('All movies loaded succesfully');
        res.send(movies);
});

router.post('/', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send('Invalid Genre');

        const { title, genreId, numberInStock, dailyRentalRate } = req.body;
        // mongoose talk with the driver, so the ID is set here
        const movie = await new Movie({
            title: title,
            genre: {
                _id: genreId,
                name: genre.name
            },
            numberInStock: numberInStock,
            dailyRentalRate: dailyRentalRate
        }).save();
        res.send(movie);
});

router.put('/:id', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.message);
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.statut(404).send('Invalid Genre');

        const { title, genreId, numberInStock, dailyRentalRate } = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: title,
            genre: {
                _id: genreId,
                name: genre.name
            },
            numberInStock: numberInStock,
            dailyRentalRate: dailyRentalRate
        }, { new: true });
        if (!movie) return res.statut(404).send('movie not found with given ID');
        res.send(movie);
});

router.delete('/:id', async (req, res) => {
        const movie = await Movie.findByIdAndUpdate(req.params.id);
        if (!movie) return res.status(404).send('Movie not found with the given ID');
        res.send(movie);
})

module.exports = router;