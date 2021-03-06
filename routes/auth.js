const express = require('express');
const router = express.Router();
const { User } = require('../model/users');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('Invalid email or user');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = user.generateAuthToken();
    res.send(token);
});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;