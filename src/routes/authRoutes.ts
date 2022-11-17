import express, { Router } from "express";

import {signup} from '../controllers/authController';

const router: Router = express.Router();

router.get('/signup', signup);



module.exports= router;