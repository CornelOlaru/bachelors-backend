const express = require('express');
const orderController = require('../controllers/orderController');
const{  AuthenticateToken } = require('../utils/authMiddleware.js');

const router = express.Router();

// Create order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/',  orderController.getOrders);

//Get order by Search
router.get('/search', orderController.getOrderBySearch);

//Get order by User
router.get('/search/paid/', orderController.getOrderByUser);

// Get order by ID
router.get('/:id',  orderController.getOrderById);

//Checkout orders
router.put("/checkout", orderController.checkoutOrders);

// Update order
router.put('/:id',  orderController.updateOrder);

// Delete order
router.put('/delete/:id', orderController.deleteOrder);

module.exports = router;