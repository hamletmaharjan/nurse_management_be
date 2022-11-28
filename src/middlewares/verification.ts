import {Request, Response,NextFunction} from 'express';

const jwt = require('jsonwebtoken');

const secretKey = 'hidethis';

export const verification = (req: any, res: Response, next:NextFunction) =>{
    if (!req.headers || !req.headers['authorization']) {
        res.statusCode = 401;
        return res.json({ message: 'No token provided.' });
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (err:any, decoded:any) => {
        if (err) {
            res.statusCode = 500;
            return res.json({ message: 'Failed to authenticate token.' });
        }

        req.user = decoded;
        next();
    });

}