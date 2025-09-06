const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:id", (req, res) => {
  db.get(`SELECT id, username, email FROM users WHERE id=?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

router.put("/:id", (req, res) => {
  const { username, email } = req.body;
  db.run(
    `UPDATE users SET username=?, email=? WHERE id=?`,
    [username, email, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

module.exports = router;