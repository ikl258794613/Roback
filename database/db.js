const mysql = require("mysql2");
const Promise = require("bluebird");

require('dotenv').config()
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    dateStrings: true,
    //把資料庫的時間弄對
  });

connection = Promise.promisifyAll(connection);
module.exports = connection;
