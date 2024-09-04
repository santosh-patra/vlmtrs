import mysql from 'mysql';

import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();
// for local user connect

// const sequelize = new Sequelize(`vellow-motors`, `root`, `admin`, {
//     host: `localhost`,
//     dialect: 'mysql',
//     logging: false
// });

// for cloud connect
let user = process.env.USER;
let password = process.env.PASSWORD
let DB = process.env.DB
let host = process.env.HOST
let dbPORT = process.env.DBPORT
let dialect = process.env.dialect
const serviceURI = `${dialect}://${user}:${password}@${host}:${dbPORT}/${DB}`;
const sequelize = new Sequelize(serviceURI,{
  dialect: 'mysql',
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
    }
  });
  sequelize.authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

export default sequelize;

