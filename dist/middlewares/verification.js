"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.TOKEN_SECRET_KEY || 'hidethis';
const verification = (req, res, next) => {
    if (!req.headers || !req.headers['authorization']) {
        res.statusCode = 401;
        return res.json({ message: 'No token provided.' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.statusCode = 500;
            return res.json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};
exports.verification = verification;
