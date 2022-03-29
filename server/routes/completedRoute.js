const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM completed ORDER BY id', (err, result) => {
    if(err) return next(err);

    res.json(result.rows);
  });
});

router.post('/', (req, res, next) => {
  const {newTitle, newAuthor, newRating, newStarted, newFinished} = req.body;

  pool.query('INSERT INTO completed(title, author, rating, start_date, finish_date) VALUES($1, $2, $3, $4, $5)', [newTitle, newAuthor, newRating, newStarted, newFinished], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.put('/:id', (req, res, next) => {
  const {editTitle, editAuthor, editRating, editStarted, editFinished} = req.body;

  pool.query('UPDATE completed SET title=$1, author=$2, rating=$3, start_date=$4, finish_date=$5 WHERE id=$6', [editTitle, editAuthor, editRating, editStarted, editFinished, req.params.id], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res, next) => {
  pool.query('DELETE FROM completed WHERE id=$1', [req.params.id], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

module.exports = router;