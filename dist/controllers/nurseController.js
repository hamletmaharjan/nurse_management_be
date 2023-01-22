"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoundingManager = exports.deleteNurse = exports.update = exports.fetchById = exports.fetchAll = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const path = 'uploads/images';
const nurseServices_1 = require("../services/nurseServices");
const create = (req, res, next) => {
    const nurse = req.body;
    if (req.user) {
        nurse.user_id = req.user.id;
    }
    else {
        nurse.user_id = 6;
    }
    if (req.file) {
        console.log('file', req.file);
        nurse.image = req.file.filename;
        // nurse.image = req.file.location;
    }
    (0, nurseServices_1.createNurse)(nurse)
        .then(data => {
        res.json(data[0]);
    })
        .catch(error => next(error));
};
exports.create = create;
const fetchAll = (req, res, next) => {
    (0, nurseServices_1.fetchAllNurses)()
        .then(data => {
        res.json(data);
    })
        .catch(error => next(error));
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
    (0, nurseServices_1.fetchUnmodifiedNurseById)(id)
        .then(data => {
        const nurse = req.body;
        nurse.user_id = req.user.id;
        if (data.user_id === req.user.id) {
            if (req.file) {
                nurse.image = req.file.filename;
                try {
                    fs_1.default.unlinkSync(path + '/' + data.image);
                }
                catch (err) {
                    console.error(err);
                }
            }
            else {
                nurse.image = data.image;
            }
            return (0, nurseServices_1.updateNurse)(id, nurse);
        }
        else {
            res.json({ message: 'not authorized' });
        }
    })
        .then(data => res.json(data))
        .catch(error => next(error));
};
exports.update = update;
const deleteNurse = (req, res, next) => {
    const id = req.params.nurseId;
    (0, nurseServices_1.fetchUnmodifiedNurseById)(id)
        .then(data => {
        if (data.user_id === req.user.id) {
            if (data.image) {
                try {
                    fs_1.default.unlinkSync(path + '/' + data.image);
                }
                catch (err) {
                    console.error(err);
                }
            }
            return (0, nurseServices_1.deleteNurseById)(id);
        }
        else {
            res.json({ message: 'not authorized' });
        }
    })
        .then(data => res.json(data))
        .catch(error => next(error));
};
exports.deleteNurse = deleteNurse;
const updateRoundingManager = (req, res, next) => {
    const id = req.params.nurseId;
    (0, nurseServices_1.fetchRoundingManager)()
        .then(data => {
        if (!data || data.id == id) {
            console.log('return');
            return;
        }
        const roundingManager = Object.assign(Object.assign({}, data), { is_rounding_manager: false });
        return (0, nurseServices_1.updateNurse)(data.id, roundingManager);
    })
        .then(data => {
        return (0, nurseServices_1.fetchUnmodifiedNurseById)(id);
    })
        .then(data => {
        const newRoundingManager = Object.assign(Object.assign({}, data), { is_rounding_manager: !data.is_rounding_manager });
        return (0, nurseServices_1.updateNurse)(newRoundingManager.id, newRoundingManager);
    })
        .then(data => {
        return res.json(data);
    })
        .catch(error => next(error));
};
exports.updateRoundingManager = updateRoundingManager;
