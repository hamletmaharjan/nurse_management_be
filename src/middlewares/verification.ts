import {Request, Response,NextFunction} from 'express';

const jwt = require('jsonwebtoken');

const secretKey = 'hidethis';

export const verification = (req: any, res: Response, next:NextFunction) =>{
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token', token)
    if (!token){
        return res.status(401).json({ message: 'No token provided.' });
    }

    // var test = jwt.verify(token, secretKey);
    // console.log('why',test)

    jwt.verify(token, secretKey, (err:any, decoded:any) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
        console.log("decoded", decoded);
        req.user = decoded;
        next();
    });

}