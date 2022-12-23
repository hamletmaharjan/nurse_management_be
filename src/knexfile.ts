
import dotenv from 'dotenv';
dotenv.config();

export default {
    client: 'pg',
    connection: {
      host: process.env.HOST || '127.0.0.1',
      port: process.env.DATABASE_PORT || '5432',
      database: process.env.DATABASE || 'nurse_mgmt',
      user: process.env.USER || 'postgres',
      password: process.env.PASSWORD || 'postgres',
    },
    // connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations'
      }
  };
