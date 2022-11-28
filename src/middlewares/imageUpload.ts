import {Request, Response,NextFunction} from 'express';

import upload from '../utils/upload';

const singleUpload = upload.single('image');

const imageUpload = (req: any, res: Response, next:NextFunction) =>{
    singleUpload(req, res, function(err:any) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err}] });
        }
    
        next();
    });
}

export default imageUpload;