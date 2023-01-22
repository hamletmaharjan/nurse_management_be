import express, { Router } from 'express';

const router: Router = express.Router();

import imageUpload from '../middlewares/imageUpload';

import {
  create,
  fetchAll,
  update,
  deleteNurse,
  fetchById,
  updateRoundingManager,
} from '../controllers/nurseController';

/**
 * @swagger
 * tags:
 *   name: Nurses
 *   description: The nurses managing API
 * /nurses:
 *   get:
 *     summary: Get the nurses.
 *     tags:
 *       - Nurse
 *     responses:
 *       200:
 *         description: Get all the nurses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  nurses:
 *                    type: array
 *                    items:
 *                     $ref: '#/components/schemas/Nurse'
 */
router.get('/', fetchAll);

router.post('/', imageUpload, create);

router.get('/:nurseId', fetchById);

router.put('/:nurseId', imageUpload, update);

router.delete('/:nurseId', deleteNurse);

router.patch('/:nurseId/set-rounding-manager', updateRoundingManager);

export default router;
