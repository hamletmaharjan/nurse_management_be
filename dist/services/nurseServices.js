"use strict";
// const knex:any = require('../db');
// import {knex} from '../db';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNurseById = exports.updateNurse = exports.fetchNurseById = exports.fetchAllNurses = exports.createNurse = void 0;
const db_1 = __importDefault(require("../db"));
const createNurse = (nurse) => {
    return (0, db_1.default)('nurses').insert(nurse);
};
exports.createNurse = createNurse;
const fetchAllNurses = () => {
    return db_1.default.select().table('nurses');
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
// export const fetchUserByEmail = (email: string) => {
//     return knex('users').where('email', email).first();
// }
