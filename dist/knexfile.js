"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    client: 'pg',
    connection: {
        database: process.env.DATABASE || 'nurse_mgmt',
        user: process.env.USER || 'postgres',
        password: process.env.PASSWORD || 'postgres',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'migrations',
        directory: './migrations'
    }
};
