const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customerController");

// Get all customers
router.get("/", customersController.getAllCustomers);

// Get a specific customer
router.get("/:id", customersController.getCustomerById);

// Add a new customer
router.post("/", customersController.addCustomer);

// Update a customer
router.put("/:id", customersController.updateCustomer);

// Delete a customer
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;
