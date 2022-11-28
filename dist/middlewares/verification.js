"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const jwt = require('jsonwebtoken');
const secretKey = 'hidethis';
const verification = (req, res, next) => {
    if (!req.headers || !req.headers['authorization']) {
        res.statusCode = 401;
        return res.json({ message: 'No token provided.' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.statusCode = 500;
            return res.json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};
exports.verification = verification;
