const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [200, 'Password must be less than 20 characters long'],
        // match: [/^[a-zA-Z0-9]{6,10}$/, 'Password must contain only letters and numbers'],
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'user'],
        default: 'user',
    },
    refreshToken: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


// Declare methods
userSchema.methods.setActive = function() {
    this.isActive = true;
    return this.save();
};

userSchema.methods.getActive = function() {
    return this.isActive;
};


const User = mongoose.model('User', userSchema);
module.exports = User;