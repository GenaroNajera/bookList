const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM next ORDER BY id', (err, result) => {
    if(err) return next(err);

    res.json(result.rows);
  });
});

router.post('/', (req, res, next) => {
  const {newTitle, newAuthor} = req.body;

  pool.query('INSERT INTO next(title, author) VALUES($1, $2)', [newTitle, newAuthor], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.put('/:id', (req, res, next) => {
  const {editTitle, editAuthor} = req.body;

  pool.query('UPDATE next SET title=$1, author=$2 WHERE id=$3', [editTitle, editAuthor, req.params.id], (err, result) => {
    if(err) return next(err);
    
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res, next) => {
  pool.query('DELETE FROM next WHERE id=$1', [req.params.id], (err, result) => {
    if(err) return next(err);
    
    res.sendStatus(200);
  });
});

module.exports = router;