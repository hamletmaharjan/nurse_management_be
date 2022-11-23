import express, { Router } from "express";

const router: Router = express.Router();

// import upload from "../utils/upload";

// const singleUpload = upload.single('image');
import imageUpload from '../middlewares/imageUpload'
// import {imageUpload} from '../middlewares/imageUpload';

import {create, fetchAll, update, deleteNurse} from '../controllers/nurseController';

router.get('/', fetchAll)

router.post('/',imageUpload, create);

router.put('/:nurseId', imageUpload, update);

router.delete('/:nurseId', deleteNurse);


module.exports = router;