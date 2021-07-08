const express = require('express');

const inputCheck = require('./db/utils/inputCheck');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);
const db = require('./db/connection');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

/// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
// Get all candidates

// Create a candidate

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
