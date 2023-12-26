const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.post('/', customerController.addCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
