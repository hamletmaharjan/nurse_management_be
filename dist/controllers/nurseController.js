"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNurse = exports.update = exports.fetchById = exports.fetchAll = exports.create = void 0;
const nurseServices_1 = require("../services/nurseServices");
const create = (req, res, next) => {
    let nurse = req.body;
    if (req.user) {
        nurse.user_id = req.user.id;
    }
    else {
        nurse.user_id = 6;
    }
    if (req.file) {
        nurse.image = req.file.location;
    }
    // console.log("nurse",req.file);
    (0, nurseServices_1.createNurse)(nurse).then((data) => {
        res.json({ message: "added" });
    }).catch((error) => next(error));
};
exports.create = create;
const fetchAll = (req, res, next) => {
    console.log('fetch');
    (0, nurseServices_1.fetchAllNurses)().then((data) => {
        res.json(data);
    }).catch((error) => next(error));
};
exports.fetchAll = fetchAll;
const fetchById = (req, res, next) => {
    (0, nurseServices_1.fetchNurseById)(req.params.nurseId)
        .then(data => res.json({ data }))
        .catch(err => next(err));
};
exports.fetchById = fetchById;
const update = (req, res, next) => {
    const id = req.params.nurseId;
    (0, nurseServices_1.fetchNurseById)(id).then((data) => {
        let nurse = req.body;
        nurse.user_id = req.user.id;
        console.log('req', req.body);
        if (data.user_id === req.user.id) {
            if (req.file) {
                nurse.image = req.file.location;
            }
            else {
                nurse.image = data.image;
            }
            console.log('data', nurse);
            return (0, nurseServices_1.updateNurse)(id, nurse);
            // res.json({message: "can update"})
        }
        else {
            res.json({ message: "not authorized" });
        }
    })
        .then(data => res.json(data))
        .catch(error => next(error));
    // updateNurse(id, req.body)
};
exports.update = update;
const deleteNurse = (req, res, next) => {
    const id = req.params.nurseId;
    console.log('here');
    (0, nurseServices_1.fetchNurseById)(id).then((data) => {
        console.log('here', data);
        if (data.user_id === req.user.id) {
            return (0, nurseServices_1.deleteNurseById)(id);
            // res.json({message: "can update"})
        }
        else {
            res.json({ message: "not authorized" });
        }
    })
        .then(data => res.json(data))
        .catch(error => next(error));
};
exports.deleteNurse = deleteNurse;
