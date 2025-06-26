const express = require('express');
const productController = require('../controllers/productController.js');
const{  AuthenticateToken } = require('../utils/authMiddleware.js');
const router = express.Router();

// Create product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

//Get all products including deleted
router.get('/all', productController.getProductsIncludingDeleted)


// Search product
router.get('/search', productController.searchProduct);

// Delete product
router.put('/delete/:id', productController.softDeleteProduct);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);





module.exports = router;