import  {Request, Response, NextFunction } from 'express';

var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const secretKey = 'hidethis';
import {createUser, fetchUserByEmail} from '../services/userSerivces';


export const signin = (req: Request, res: Response, next: NextFunction) => {
    fetchUserByEmail(req.body.email).then((data) => {
        if(bcrypt.compareSync(req.body.password, data.password)){

            let userInfo = {
                id: data.id,
                name: data.name,
                email: data.email
            };

            var token = jwt.sign(userInfo, secretKey);
            res.json({id:data.id,  token: token ,email: data.email});
        }
        res.status(401).json({ message: 'Incorrect email or password' });
    })
}

export const signup = (req: Request, res: Response, next:NextFunction) => {
    let user = req.body;

    user.password =  bcrypt.hashSync(req.body.password, saltRounds);
    
    createUser(user).then((data) => { 
        console.log(data);
        res.json({data});
      }).catch((error) => {
        next(error);
      });
}