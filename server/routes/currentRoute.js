const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM current ORDER BY id', (err, result) => {
    if(err) return next(err);

    res.json(result.rows);
  });
});

router.post('/', (req, res, next) => {
  const {newTitle, newAuthor, newStarted} = req.body;

  pool.query('INSERT INTO current(title, author, start_date) VALUES($1, $2, $3)', [newTitle, newAuthor, newStarted], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.put('/:id', (req, res, next) => {
  const {editTitle, editAuthor, editStarted, editBookmark} = req.body;

  pool.query('UPDATE current SET title=$1, author=$2, start_date=$3, bookmark=$4 WHERE id=$5', [editTitle, editAuthor, editStarted, editBookmark, req.params.id], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res, next) => {
  pool.query('DELETE FROM current WHERE id=$1', [req.params.id], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

module.exports = router;