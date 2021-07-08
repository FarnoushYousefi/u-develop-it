const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
router.get('/parties', (req, res) => {
  const sql = `select * from parties`;
  db.query(sql, (err, rows) => {
    console.log('id', params);
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

router.get('/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
});

// Delete a candidate

router.delete('/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'Party not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});
