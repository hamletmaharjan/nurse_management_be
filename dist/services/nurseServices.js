"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRoundingManager = exports.deleteNurseById = exports.updateNurse = exports.fetchNurseById = exports.fetchAllNurses = exports.createNurse = void 0;
const db_1 = __importDefault(require("../db"));
const createNurse = (nurse) => {
    return (0, db_1.default)('nurses').insert(nurse);
};
exports.createNurse = createNurse;
const fetchAllNurses = () => {
    return db_1.default.select().table('nurses').orderBy('full_name');
};
exports.fetchAllNurses = fetchAllNurses;
const fetchNurseById = (nurseId) => {
    return (0, db_1.default)('nurses').where('id', nurseId).first();
};
exports.fetchNurseById = fetchNurseById;
const updateNurse = (nurseId, nurse) => {
    return (0, db_1.default)('nurses').where('id', nurseId).update(nurse);
};
exports.updateNurse = updateNurse;
const deleteNurseById = (nurseId) => {
    return (0, db_1.default)('nurses').where('id', nurseId).del();
};
exports.deleteNurseById = deleteNurseById;
const fetchRoundingManager = () => {
    return (0, db_1.default)('nurses').where('is_rounding_manager', true).first();
};
exports.fetchRoundingManager = fetchRoundingManager;
// export const updateRoundingManager = (id:number, nurse: object) => {
//     return knex('nurses').where('id', id).update(nurse);
// }
