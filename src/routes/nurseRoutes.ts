import express, { Router } from "express";

const router: Router = express.Router();

import {create, fetchAll, update, deleteNurse} from '../controllers/nurseController';

router.get('/', fetchAll)

router.post('/', create);

router.put('/:nurseId', update);

router.delete('/:nurseId', deleteNurse);


module.exports = router;