"use strict";
// const knex:any = require('../db');
// import {knex} from '../db';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (user) => {
    return (0, db_1.default)('users').insert(user);
};
exports.createUser = createUser;
const fetchUserByEmail = (email) => {
    return (0, db_1.default)('users').where('email', email).first();
};
exports.fetchUserByEmail = fetchUserByEmail;
