'use strict';
const express = require('express');
const Joi = require('joi');
const Customer = require('../models/customers');
const customersRouter = express.Router();
const {authenticateToken} = require('../components/auth');

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });
  return schema.validate(customer);
};

customersRouter.post('/api/v1/customers', authenticateToken, 
  async (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
    return;
  }
);

customersRouter.get('/api/v1/customers', authenticateToken,
    async (req, res) => {
    const customers = await Customer.find();
    if (!customers) {
      res.status(404).send('No customers found!');
    }
    res.status(200).json(customers);
    return;
  }
);

customersRouter.get('/api/v1/customers/:customerId', authenticateToken,
  async (req, res) => {
    const customer = Customer.findOne({
      _id: req.params.customerId
    });
    if (!customer) {
      res.status(404).send(`Customer '${req.params.customerId}' not found!`);
      return;
    }
    res.status(200).json(customer);
    return;
  }
);

customersRouter.put('/api/v1/customers/:customerId', authenticateToken,
  async (req, res) => {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.customerId
      },
      req.body
    );
    if (!customer) {
      res.status(404).send(`Customer '${req.params.customerId}' not found!`);
      return;
    }
    res.status(200).json(customer);
    return;
  }
);

customersRouter.delete('api/v1/customers', authenticateToken,
  async (req, res) => {
    const customers = await Customer.deleteMany({});
    res.status(200).send(customers);
    return;
  }
);

customersRouter.delete('/api/v1/customers/:customerId', authenticateToken,
  async (req, res) => {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.customerId
    });
    if (!customer) {
      res.status(404).send(`Customer '${req.params.customerId}' not found!`);
      return;
    }
    customer.delete();
    res.status(200).send(`Customer '${req.params.customerId}' deleted!`);
    return;
  }
);

module.exports = customersRouter;
