const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../db/utils/inputCheck');
router.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});
// Update a candidate's party
router.put('/candidate/:id', ({ body, params }, res) => {
  const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
  const params1 = [body.party_id, params.id];
  // const errors = inputCheck(req.body, 'party_id');
  //
  console.log(params1);

  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});
router.delete('/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  console.log('id', params);
  db.query(sql, params, (err, result) => {
    console.log('result', result);

    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found',
      });
    } else {
      console.log('result', result);
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});
router.get('/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});
// Get a single candidate
router.get('/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
               AS party_name 
               FROM candidates 
               LEFT JOIN parties 
               ON candidates.party_id = parties.id 
               WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});
module.exports = router;
