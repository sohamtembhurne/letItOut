require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
    const authHeader = req.header('Authorization');

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.userId = decoded.userId;
        res.locals.username = decoded.username
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
};
