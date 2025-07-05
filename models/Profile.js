const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,   
        required: true,
    },
    department: {
        type: String,
    },
    classe: {
        type: String,
    },
}, {timestamps: true});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;   

            