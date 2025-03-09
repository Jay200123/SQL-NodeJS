import { pool } from "../../config/index.js";

export class StudentModel {
  static async getAll() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM students", (results, err) => {
        if (err) {
          return reject(new ErrorHandler(500, err.sqlMessage));
        }
        resolve(results);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM students WHERE id = ?",
        [id],
        (results, err) => {
          if (err) {
            return reject(new ErrorHandler(500, err.sqlMessage));
          }
          resolve(results);
        }
      );
    });
  }

  static async insert(data) {
    return new Promise((resolve, reject) => {
      const {
        user_id,
        title,
        fname,
        lname,
        section,
        phone,
        address,
        city,
        student_image,
        name,
      } = data;
      pool.query(
        "INSERT INTO users(user_id, title, fname, lname, section, phone, address, city, student_image, date_created, date_updated ) SELECT user_id, ?, ?, ?, ?, ?, ?, ?, ? FROM users WHERE name = ?",
        [
          user_id,
          title,
          fname,
          lname,
          section,
          phone,
          address,
          city,
          student_image,
          Date.now(),
          Date.now(),
          name,
        ],
        (results, err) => {
          if (err) {
            return reject(new ErrorHandler(500, err.sqlMessage));
          }
          resolve(results);
        }
      );
    });
  }
}
