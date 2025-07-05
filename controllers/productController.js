const Product = require('../models/Product');


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
    try {
        const products = await Product.find().sort({createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
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

module.exports = {addProduct, getAllProducts, getProductById, updateProductById, deleteProductById, insertManyProducts};    