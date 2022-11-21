import express, { Router } from "express";

const router: Router = express.Router();

const userRoutes = require('./routes/userRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const authRoutes = require('./routes/authRoutes');

import {verification} from './middlewares/verification';

router.get('/', (req,res) => {
    res.send('Hello World');
})

router.use('/auth', authRoutes);


router.use('/nurses', verification, nurseRoutes);
router.use('/users', userRoutes);


module.exports = router;

