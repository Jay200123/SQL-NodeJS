import mysql  from "mysql";
import { envConfig } from "./environment.js";

envConfig();
export const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    throw new Error(err.message);
  }

  if (connection) {
    connection.release();
  }
});
