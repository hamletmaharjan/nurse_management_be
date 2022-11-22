"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNurse = exports.update = exports.fetchAll = exports.create = void 0;
const nurseServices_1 = require("../services/nurseServices");
const create = (req, res, next) => {
    let nurse = req.body;
    nurse.user_id = req.user.id;
    console.log("nurse", req.file);
    (0, nurseServices_1.createNurse)(nurse).then((data) => {
        res.json({ message: "added" });
    }).catch((error) => next(error));
};
exports.create = create;
const fetchAll = (req, res, next) => {
    (0, nurseServices_1.fetchAllNurses)().then((data) => {
        res.json(data);
    }).catch((error) => next(error));
};
exports.fetchAll = fetchAll;
const update = (req, res, next) => {
    const id = req.params.nurseId;
    (0, nurseServices_1.fetchNurseById)(id).then((data) => {
        let nurse = req.body;
        nurse.user_id = req.user.id;
        if (data.user_id === req.user.id) {
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
    (0, nurseServices_1.fetchNurseById)(id).then((data) => {
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
