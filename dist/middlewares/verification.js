"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const jwt = require('jsonwebtoken');
const secretKey = 'hidethis';
const verification = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};
exports.verification = verification;
