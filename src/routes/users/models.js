import { pool } from "../../config/database.js";
import { ErrorHandler } from "../../utils/index.js";

export class UserModel {
  static async getAll() {
    return await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users", (err, results) => {
        if (err) {
          return reject(new ErrorHandler(err.sqlMessage, 500));
        }
        resolve(results);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
          return reject(new ErrorHandler(err.sqlMessage, 500));
        }
        resolve(results);
      });
    });
  }

  static async getByName(name) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM users WHERE name = ?",
        [name],
        (err, results) => {
          if (err) {
            return reject(new ErrorHandler(err.sqlMessage, 500));
          }
          resolve(results);
        }
      );
    });
  }

  static async insert(data) {
    return new Promise((resolve, reject) => {
      const { name, email, password, role } = data;
      pool.query(
        "INSERT INTO users(name, email, password, created_at, updated_at, role) VALUES(?, ?, ?, ?, ?, ?)",
        [name, email, password, Date.now(), Date.now(), role],
        (err, results) => {
          if (err) {
            return reject(new ErrorHandler(err.sqlMessage, 500));
          }
          resolve(results);
        }
      );
    });
  }

  static async updateById(id, data) {
    return new Promise((resolve, reject) => {
      const { name, email, password, role } = data;
      pool.query(
        "UPDATE users SET name=?, email=?, password=?, updated_at=?, role=? WHERE id=?",
        [name, email, password, Date.now(), role, id],
        (err, results) => {
          if (err) {
            return reject(new ErrorHandler(err.sqlMessage, 500));
          }
          resolve(results);
        }
      );
    });
  }

  static async deleteById(id) {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM users WHERE id=?", [id], (err, results) => {
        if (err) {
          return reject(new ErrorHandler(err.sqlMessage, 500));
        }
        resolve(results);
      });
    });
  }
}
