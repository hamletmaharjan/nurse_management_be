import  {Request, Response, NextFunction } from 'express';


import {
    createNurse, 
    fetchAllNurses, 
    updateNurse, 
    fetchNurseById,
    deleteNurseById
} from '../services/nurseServices';


export const create = (req: any, res: Response, next: NextFunction) => {
    let nurse = req.body;
    nurse.user_id = req.user.id;
    if(req.file) {
        nurse.image = req.file.location;
    }
    // console.log("nurse",req.file);
    createNurse(nurse).then((data) => {
        res.json({message: "added"});
    }).catch((error) => next(error));
}

export const fetchAll = (req:Request, res: Response, next: NextFunction) => {
    fetchAllNurses().then((data) => {
        res.json(data);
    }).catch((error) => next(error));
}

export const update = (req: any, res: Response, next: NextFunction) => {
    const id = req.params.nurseId;

    fetchNurseById(id).then((data) => {
        let nurse = req.body;
        nurse.user_id = req.user.id;
        console.log('req', req.body)
        
        if(data.user_id === req.user.id) {
            if(req.file) {
                nurse.image = req.file.location;
            } else {
                nurse.image = data.image
            }
            console.log('data', nurse);
            return updateNurse(id, nurse);
            // res.json({message: "can update"})
        } else {
            res.json({message: "not authorized"})
        }
    })
    .then(data => res.json(data))
    .catch(error => next(error));

    // updateNurse(id, req.body)
}

export const deleteNurse = (req: any, res: Response, next: NextFunction) => {
    const id = req.params.nurseId;

    fetchNurseById(id).then((data) => {
        if(data.user_id === req.user.id) {

            return deleteNurseById(id);
            // res.json({message: "can update"})
        } else {
            res.json({message: "not authorized"})
        }
    })
    .then(data => res.json(data))
    .catch(error => next(error));
}