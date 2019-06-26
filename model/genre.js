const mongoose = require('mongoose');
const Joi = require('joi');

const schemaGenre = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('Genre', schemaGenre);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, schema);
}

exports.schemaGenre = schemaGenre;
exports.validate = validateGenre;
exports.Genre = Genre;