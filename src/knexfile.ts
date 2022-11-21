// import dotenv from 'dotenv';
// dotenv.config();



// module.exports = {
// 	client: 'mysql2',
// 	connection: {
// 	host : process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME
//   	},
// 	migrations: {
// 	tableName: 'migrations',
// 	directory: './migrations'
// 	}
// };

export default {
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