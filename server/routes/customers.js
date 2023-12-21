const express = require('express');
const app = express.Router();

const Customers = require("../models/customers")

// @route   GET /api/customers/
// @desc    Get a specific student
// @access  Public

app.get('/', async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.send({ customers })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const customers = await Customers.findById(req.params.id);
    res.send({ customers });
  } catch (err) {
    res.status(404).send({ message: 'Customer not found!' });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const updatedCustomers = await Customers.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'Customer Updated Successfully!' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});
// @route   POST /api/customers/
// @access  Public
app.post('/', async (req, res) => {
  try {
    const newCustomer = await Customers.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
     });
    //  res.send({ newCustomer });
    res.send({ message: 'Customer Added Successfully' });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   DELETE /api/customers/:id
// @desc    Delete a student
// @access  Public
app.delete('/:id', async (req, res) => {
  try {
    const removeCustomers = await Customers.findByIdAndRemove(req.params.id);
    res.send({ message: 'Customer Deleted Successfully!' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

module.exports = app;