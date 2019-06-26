const express = require('express');
const router = express.Router();
const { validate, Genre } = require('../model/genre');
const debug = require('debug')('app:routerGenre');
const validateObejctId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
// const asyncMiddleware = require('../middleware/async');

router.get('/',  async (req, res, next) => {
            const genres = await Genre.find().sort('name');
            debug('movies loaded succesfully')
            res.send(genres);
});

router.get('/:id', validateObejctId ,async (req, res, next) => {
        const genre = await Genre.findById({_id: req.params.id});

        if(!genre) return res.status(404).send('Genre not found with the given ID');

        res.send(genre);
});

router.post('/', auth ,async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.message);
        // mongoose talk with the driver, so the ID is set here
        const genre = new Genre({ name: req.body.name });
        await genre.save();
        res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
        const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
        if (!genre) return res.status(404).send('Genre not found with the given ID');
        debug(`movie ${genre.name} deleted succesfully`);
        res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
            new: true
        });
        if (!genre) return res.status(404).send('Genre not found with the given ID');
        res.send(genre);
});

module.exports = router;