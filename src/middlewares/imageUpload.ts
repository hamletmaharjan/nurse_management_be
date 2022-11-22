import {Request, Response,NextFunction} from 'express';

import upload from '../utils/upload';

const singleUpload = upload.single('image');

const imageUpload = (req: any, res: Response, next:NextFunction) =>{
    singleUpload(req, res, function(err) {
        console.log('req', req.file)
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
    
        next();
    });
}

export default imageUpload;