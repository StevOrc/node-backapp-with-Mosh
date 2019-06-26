const Joi = require('joi');

module.exports = function() {
    // we require a method and put it an the Object Joi required before and named it objectid
    Joi.objectId = require('joi-objectid')(Joi);
}