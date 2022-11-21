"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = 'hidethis';
const userSerivces_1 = require("../services/userSerivces");
const signin = (req, res, next) => {
    (0, userSerivces_1.fetchUserByEmail)(req.body.email).then((data) => {
        console.log('data', data);
        if (bcrypt.compareSync(req.body.password, data.password)) {
            // res.json({message:"success"});
            let userInfo = {
                id: data.id,
                name: data.name,
                email: data.email
            };
            var token = jwt.sign({ userInfo }, secretKey);
            res.json({ token });
        }
        res.json({ message: "wrong password" });
    });
};
exports.signin = signin;
const signup = (req, res, next) => {
    // console.log(req.body);
    let user = req.body;
    user.password = bcrypt.hashSync(req.body.password, saltRounds);
    (0, userSerivces_1.createUser)(user).then((data) => {
        // Do something with users
        console.log(data);
        res.json({ data });
    }).catch((error) => {
        next(error);
    });
    // res.send('singupp here');
};
exports.signup = signup;