const express = require('express');
const router = express.Router();
const actionsProducts = require('../controllers/productController');
const swaggerJSDoc = require('swagger-jsdoc')


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - quantity
 *             example:
 *               name: Product 1
 *               price: 100
 *               description: This is a product
 *               category: Electronics
 *               quantity: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category: 
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *
 *  
 */ 
router.post('/', actionsProducts.addProduct);


router.get('/', actionsProducts.getAllProducts);


/**
 * @swagger
 * /products/{id}:
 */
router.put('/:id', actionsProducts.updateProductById);
router.delete('/:id', actionsProducts.deleteProductById);   
router.post('/bulk', actionsProducts.insertManyProducts);

router.get('/user/products', actionsProducts.getAllProductsByUserId);

module.exports = router;
