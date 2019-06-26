const mongoose = require('mongoose');
const Joi = require('joi');

const schemaCustomer = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Customer = mongoose.model('Customer', schemaCustomer);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(customer, schema);
}

exports.validate = validateCustomer;
exports.Customer = Customer;
exports.schemaCustormer = schemaCustomer;