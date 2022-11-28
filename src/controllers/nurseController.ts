import  {Request, Response, NextFunction } from 'express';


import {
    createNurse, 
    fetchAllNurses, 
    updateNurse, 
    fetchNurseById,
    deleteNurseById,
    fetchRoundingManager,
} from '../services/nurseServices';


export const create = (req: any, res: Response, next: NextFunction) => {
    let nurse = req.body;
    if(req.user){
        nurse.user_id = req.user.id;
    } else {
        nurse.user_id = 6;
    }
    if(req.file) {
        nurse.image = req.file.location;
    }
    // console.log("nurse",req.file);
    createNurse(nurse).then((data) => {
        res.json({message: "added"});
    }).catch((error) => next(error));
}

export const fetchAll = (req:Request, res: Response, next: NextFunction) => {
    // console.log('fetch')
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

    fetchNurseById(id).then((data) => {
        let nurse = req.body;
        nurse.user_id = req.user.id;
        
        if(data.user_id === req.user.id) {
            if(req.file) {
                nurse.image = req.file.location;
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

    fetchNurseById(id).then((data) => {
        if(data.user_id === req.user.id) {
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
        // console.log('rm', roundingManager);
        return updateNurse(data.id,roundingManager)
    }).then(data => {
        return fetchNurseById(id);
    }).then(data => {
        let newRoundingManager = {...data, is_rounding_manager: true};
        return updateNurse(newRoundingManager.id, newRoundingManager);
    }).then(data => {
        return res.json(data);
    }).catch(error => next(error));

    // fetchNurseById(id).then((data) => )
}