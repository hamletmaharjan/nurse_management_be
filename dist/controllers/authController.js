"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
const secretKey = process.env.TOKEN_SECRET_KEY || 'hidethis';
const userSerivces_1 = require("../services/userSerivces");
const signin = (req, res, next) => {
    (0, userSerivces_1.fetchUserByEmail)(req.body.email).then((data) => {
        if (bcrypt_1.default.compareSync(req.body.password, data.password)) {
            let userInfo = {
                id: data.id,
                name: data.name,
                email: data.email
            };
            var token = jsonwebtoken_1.default.sign(userInfo, secretKey);
            res.json({ id: data.id, token: token, email: data.email });
        }
        else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    });
};
exports.signin = signin;
const signup = (req, res, next) => {
    let user = req.body;
    user.password = bcrypt_1.default.hashSync(req.body.password, saltRounds);
    (0, userSerivces_1.createUser)(user).then((data) => {
        res.json({ data });
    }).catch((error) => {
        next(error);
    });
};
exports.signup = signup;
