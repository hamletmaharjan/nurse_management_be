import express, { Router } from "express";

const router: Router = express.Router();

import imageUpload from '../middlewares/imageUpload'

import {create, fetchAll, update, deleteNurse, fetchById} from '../controllers/nurseController';

router.get('/', fetchAll)

router.post('/',imageUpload, create);

router.get('/:nurseId', fetchById);

router.put('/:nurseId', imageUpload, update);

router.delete('/:nurseId', deleteNurse);


module.exports = router;