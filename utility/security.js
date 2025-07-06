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


// Si vous voulez creer la fonction pour verifier le token, vous pouvez utiliser la fonction suivante
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

const verifyRefreshToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }
    
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};






module.exports = { generateToken, refreshToken, verifyToken, verifyRefreshToken, generateTokenAndRefreshToken };
