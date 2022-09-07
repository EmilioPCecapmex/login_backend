const mysql = require("mysql2");

const db_connect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

db_connect.connect();

module.exports = db_connect;
