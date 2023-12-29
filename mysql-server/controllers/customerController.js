const db = require("../models/db");

// Get all customers
exports.getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      console.error("Error retrieving customers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ customers: results });
    }
  });
};

// Get a specific customer
exports.getCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query("SELECT * FROM customers WHERE id = ?", [customerId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ customer: results[0] });
    }
  });
};

// Add a new customer
exports.addCustomer = (req, res) => {
  const { name, email, phone } = req.body;
  db.query("INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Customer added successfully" });
    }
  });
};

// Update a customer
exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  console.log('Updating customer with ID:', customerId);
  const { name, email, phone } = req.body;
  db.query("UPDATE customers SET name=?, email=?, phone=? WHERE id=?", [name, email, phone, customerId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Customer updated successfully" });
    }
  });
};

// Delete a customer
exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  db.query("DELETE FROM customers WHERE id=?", [customerId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Customer deleted successfully" });
    }
  });
};
