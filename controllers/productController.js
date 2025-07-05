const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// const auth = require('../middleware/auth');


// Add a new product
const addProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



// Get all products
const getAllProducts = async (req, res) => {  
    
    // Get all products
    try {
        const products = await Product.find().sort({createdAt: -1});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// const getAllProductWithAuth = auth(async (req, res) => {
//     const products = await Product.find().sort({createdAt: -1});
//     return res.status(200).json(products);
// });


// Get all products by user_id
const getAllProductsByUserId = async (req, res) => { 
    // Get user_id from query
    const user_id = req.query.userId;
    if(!user_id) {
        return res.status(400).json({message: 'User ID is required in the query'});
    }
    try {
        const user = await User.findById(user_id);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        return res.status(404).json({message: error.message});
    }

    
    // Get token from header
    const tokenHeader = req.headers.authorization;

    // Check if token is passed in the header
    if(!tokenHeader) {
        return res.status(403).json({message: 'Token is required'});
    }

    // Check if token is Bearer
    const token_list = tokenHeader.split(' ');
    if (token_list[0] !== 'Bearer') {
        return res.status(403).json({message: 'Token should be Bearer'});
    }

    // Get token
    const token = token_list[1];

    // Decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id !== user_id) {
            return res.status(403).json({message: 'User ID does not match with the token'});
        }
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }

    // Get all products
    try {
        const products = await Product.find().sort({createdAt: -1});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}




// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}   


// Update a product by ID
const updateProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const product = await Product.findByIdAndUpdate(id, data, {new: true});
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Insert many products
const insertManyProducts = async (req, res) => {
    try {
        const data = req.body;
        const products = await Product.insertMany(data, {ordered: false, upsert: true});
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {addProduct, getAllProducts, getProductById, updateProductById, deleteProductById, insertManyProducts, getAllProductsByUserId};    