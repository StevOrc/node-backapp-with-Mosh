const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routerCustomer');
const { Customer, validate } = require('../model/customer');

router.get('/', async (req, res) => {
        const customers = await Customer.find().sort('name');
        res.send(customers);
})

router.post('/', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.message);

        const { name, isGold, phone } = req.body;
        const customer = await new Customer({
            name: name,
            isGold: isGold,
            phone: phone
        }).save();
        res.send(customer);
});

router.put('/:id', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.message);
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true });
        if (!customer) return res.status(400).send('customer not found with the given ID');
        res.send(customer);
})

router.delete('/:id', async (req, res) => {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(400).send('customer not found with the given ID');
        res.send(customer);
})

module.exports = router;