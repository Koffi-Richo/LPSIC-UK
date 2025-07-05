const express = require('express');
const router = express.Router();
const actionsProducts = require('../controllers/productController');

router.post('/', actionsProducts.addProduct);
router.get('/', actionsProducts.getAllProducts);
router.get('/:id', actionsProducts.getProductById);
router.put('/:id', actionsProducts.updateProductById);
router.delete('/:id', actionsProducts.deleteProductById);   
router.post('/bulk', actionsProducts.insertManyProducts);

module.exports = router;
