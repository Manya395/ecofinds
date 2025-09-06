const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ecofinds.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    category TEXT,
    price REAL,
    image TEXT,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);
});

module.exports = db;