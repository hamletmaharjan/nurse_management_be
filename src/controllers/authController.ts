import { Request, Response, NextFunction } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const secretKey = process.env.TOKEN_SECRET_KEY || 'hidethis';

import { createUser, fetchUserByEmail } from '../services/userSerivces';

export const signin = (req: Request, res: Response, next: NextFunction) => {
  fetchUserByEmail(req.body.email).then(data => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      const userInfo = {
        id: data.id,
        name: data.name,
        email: data.email,
      };

      const token = jwt.sign(userInfo, secretKey);
      res.json({ id: data.id, token: token, email: data.email });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  user.password = bcrypt.hashSync(req.body.password, saltRounds);

  createUser(user)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
};
