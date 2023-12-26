const Customers = require('../models/customers');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.send({ customers });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customers = await Customers.findById(req.params.id);
    res.send({ customers });
  } catch (err) {
    res.status(404).send({ message: 'Customer not found!' });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.body; // Get the customer ID from the request body
    const updatedCustomers = await Customers.findByIdAndUpdate(id, req.body, { new: true });
    res.send({ message: 'Customer Updated Successfully!', customer: updatedCustomers });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};


const addCustomer = async (req, res) => {
  try {
    const newCustomer = await Customers.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.send({ message: 'Customer Added Successfully' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const removeCustomers = await Customers.findByIdAndRemove(req.params.id);
    res.send({ message: 'Customer Deleted Successfully!' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = {getAllCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer, updateCustomer, }