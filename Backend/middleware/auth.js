const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'Missing authorization header' });
    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token' });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};