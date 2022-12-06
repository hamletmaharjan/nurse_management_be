import  {Request, Response, NextFunction } from 'express';

import fs from 'fs';

const path = 'uploads/images';

import {
    createNurse, 
    fetchAllNurses, 
    updateNurse, 
    fetchNurseById,
    deleteNurseById,
    fetchRoundingManager,
    fetchUnmodifiedNurseById,
} from '../services/nurseServices';


export const create = (req: any, res: Response, next: NextFunction) => {
    let nurse = req.body;
    if(req.user){
        nurse.user_id = req.user.id;
    } else {
        nurse.user_id = 6;
    }
    if(req.file) {
        nurse.image = req.file.filename;
        // nurse.image = req.file.location;
    }

    createNurse(nurse).then((data) => {
        res.json(data);
    }).catch((error) => next(error));
}

export const fetchAll = (req:Request, res: Response, next: NextFunction) => {
    fetchAllNurses().then((data) => {
        res.json(data);
    }).catch((error) => next(error));
}

export const fetchById = (req:any, res:Response, next:NextFunction) => {
	fetchNurseById(req.params.nurseId)
	.then(data => res.json({ data }))
    .catch(err => next(err));
}


export const update = (req: any, res: Response, next: NextFunction) => {
    const id = req.params.nurseId;

    fetchUnmodifiedNurseById(id).then((data) => {
        let nurse = req.body;
        nurse.user_id = req.user.id;
        
        if(data.user_id === req.user.id) {
            if(req.file) {
                nurse.image = req.file.filename;
                try {
                    fs.unlinkSync(path+ '/' +data.image);
                } catch(err) {
                    console.error(err)
                }
            } else {
                nurse.image = data.image
            }
            return updateNurse(id, nurse);
        } else {
            res.json({message: "not authorized"})
        }
    })
    .then(data => res.json(data))
    .catch(error => next(error));
}

export const deleteNurse = (req: any, res: Response, next: NextFunction) => {
    const id = req.params.nurseId;

    fetchUnmodifiedNurseById(id).then((data) => {
        if(data.user_id === req.user.id) {
            if(data.image) {
                try {
                    fs.unlinkSync(path+ '/' +data.image);
                } catch(err) {
                    console.error(err)
                }
            }
            return deleteNurseById(id);
        } else {
            res.json({message: "not authorized"})
        }
    })
    .then(data => res.json(data))
    .catch(error => next(error));
}

export const updateRoundingManager = (req: any, res: Response, next: NextFunction) => {
    const id = req.params.nurseId;

    fetchRoundingManager().then(data => {
        let roundingManager = {...data, is_rounding_manager: false};
        return updateNurse(data.id,roundingManager)
    }).then(data => {
        return fetchUnmodifiedNurseById(id);
    }).then(data => {
        let newRoundingManager = {...data, is_rounding_manager: true};
        return updateNurse(newRoundingManager.id, newRoundingManager);
    }).then(data => {
        return res.json(data);
    }).catch(error => next(error));

}