const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user, role, isActive) => {
    const payload = {
        id: user._id,
        role: role,
        isActive: isActive,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m' });
};

const refreshToken = (user) => {
    return jwt.sign({user}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = { generateToken, refreshToken };
