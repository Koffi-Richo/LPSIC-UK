const Profile = require('../models/Profile');

const createProfile = async (req, res) => {
    const { user, name, phone, department, classe } = req.body;
    const tempUser = await User.findById(user);
    if (!tempUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    const profile = await Profile.create({ user, name, phone, department, classe });    
    res.status(201).json({ message: 'Profile created successfully', profile });
};

module.exports = { createProfile };
