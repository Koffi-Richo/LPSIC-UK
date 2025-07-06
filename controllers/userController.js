const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, refreshToken } = require('../utility/security');

// Register a new user
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User({ email: email, password: hashedPassword });    
        await user.save();
        user.setActive();
        return res.status(201).json({ message: 'User registered successfully', user });
        
    } catch (error) {
        return res.status(500).json({ message: 'User registration failed', error });
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    if(req.body.attaque) {
        return res.status(401).json({ message: 'Un script a été injecté' });
    }
    // const tokenHeader = req.headers.authorization;
    // if(!tokenHeader) {
    //     return res.status(403).json({ message: 'Token is required' });
    // }
    // const token = tokenHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded", decoded);
    // if(!decoded) {
    //     return res.status(403).json({ message: 'Invalid token' });
    // }
    try {   
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'email is incorrect' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'password is incorrect' });
        }
        // Generate token and refresh token
        const token = generateToken(user, user.role, true);
        const refToken = refreshToken(user);

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded", decoded);

        // Set user as active
        user.isActive = true;
        user.refreshToken = refToken;
        await user.save();

        // Send response

        return res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        return res.status(500).json({ message: 'User login failed', error });
    }
};


// get all users
const getAllUsers = async (req, res) => {
    const adminId = req.body.adminId;
    if (!adminId) {
        return res.status(401).json({ message: 'Admin Id is required in the body request' });
    }
    const user = await User.findById(adminId);
    if(user.role === 'admin' || user.role === 'superadmin') {
        const users = await User.find();
        return res.status(200).json({ message: 'All users fetched successfully', users });
    }
    return res.status(401).json({ message: 'You are not an admin or superadmin' });
    
};


// Update a user
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const user = await User.findByIdAndUpdate(id, data, {new: true});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Refresh access token using refresh token
const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken: clientRefreshToken } = req.body;
        
        if (!clientRefreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        // Verify the refresh token
        const decoded = jwt.verify(clientRefreshToken, process.env.JWT_REFRESH_SECRET);
        
        // Find the user and verify the refresh token matches
        const user = await User.findById(decoded.user._id);
        if (!user || user.refreshToken !== clientRefreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate new access token
        const newAccessToken = generateToken(user, user.role, user.isActive);
        
        // Optionally generate new refresh token (token rotation)
        const newRefreshToken = refreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();

        return res.status(200).json({
            message: 'Token refreshed successfully',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        return res.status(500).json({ message: 'Token refresh failed', error });
    }
};

module.exports = { register, login, getAllUsers, updateUser, refreshAccessToken };

