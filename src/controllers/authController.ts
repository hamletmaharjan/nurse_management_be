import  {Request, Response, NextFunction } from 'express';

var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const secretKey = 'hidethis';
import {createUser, fetchUserByEmail} from '../services/userSerivces';


export const signin = (req: Request, res: Response, next: NextFunction) => {
    fetchUserByEmail(req.body.email).then((data) => {
        console.log('data', data);
        if(bcrypt.compareSync(req.body.password, data.password)){
            // res.json({message:"success"});

            let userInfo = {
                id: data.id,
                name: data.name,
                email: data.email
            };

            var token = jwt.sign({userInfo}, secretKey);
            res.json({token});
        }
        res.json({message: "wrong password"})
    })
}

export const signup = (req: Request, res: Response, next:NextFunction) => {
    // console.log(req.body);
    let user = req.body;

    user.password =  bcrypt.hashSync(req.body.password, saltRounds);
    
    createUser(user).then((data) => { 
        // Do something with users
        console.log(data);
        res.json({data});
      }).catch((error) => {
        next(error);
      });

    // res.send('singupp here');
}