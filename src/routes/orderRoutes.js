const express = require('express');
const orderController = require('../controllers/orderController');
//const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

// Create order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/',  orderController.getOrders);

// Get order by ID
router.get('/:id',  orderController.getOrderById);

// Update order
router.put('/:id',  orderController.updateOrder);

// Delete order
router.put('/delete/:id', orderController.deleteOrder);

module.exports = router;