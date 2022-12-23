
import dotenv from 'dotenv';
dotenv.config();

export default {
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
