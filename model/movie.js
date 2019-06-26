const mongoose = require('mongoose');
const Joi = require('joi');
const { schemaGenre } = require('../model/genre');

const schemaMovie = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true
    },
    genre: {
        type: schemaGenre,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});

const Movie = mongoose.model('Movie', schemaMovie)

// note that in real world application the schema document stored in mongodb is diffrent from the 
// schema Validation that represent the input send by the user.
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(4).max(255).required(),
        genreId: Joi.objectId().required(), // we use genreId because we want the user the id, not the object
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;