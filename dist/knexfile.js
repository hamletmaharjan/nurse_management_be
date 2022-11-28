"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    client: 'pg',
    connection: {
        database: 'nurse_mgmt',
        user: 'postgres',
        password: 'postgres',
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
