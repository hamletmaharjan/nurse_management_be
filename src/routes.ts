import express, { Router } from 'express';

const router: Router = express.Router();

import authRoutes from './routes/authRoutes';
import nurseRoutes from './routes/nurseRoutes';

import { verification } from './middlewares/verification';

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.use('/auth', authRoutes);

router.use('/nurses', verification, nurseRoutes);

export default router;
