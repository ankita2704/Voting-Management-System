require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // Check if Authorization header exists
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: 'Token not found' });
    }

    // Expected format: "Bearer token"
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    const token = parts[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }   // always add expiry
    );
};

module.exports = { jwtAuthMiddleware, generateToken };
