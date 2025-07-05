const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true, 
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Furniture', 'Other'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;