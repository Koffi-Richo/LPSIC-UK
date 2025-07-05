const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
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
        console.log("Decoded:", decoded);
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
    next();
};




module.exports = auth;

