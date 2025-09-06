const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, description, category, price, image, userId } = req.body;
  db.run(
    `INSERT INTO products (title, description, category, price, image, userId) VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, category, price, image, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, category, price });
    }
  );
});

router.put("/:id", (req, res) => {
  const { title, description, category, price } = req.body;
  db.run(
    `UPDATE products SET title=?, description=?, category=?, price=? WHERE id=?`,
    [title, description, category, price, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run(`DELETE FROM products WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;