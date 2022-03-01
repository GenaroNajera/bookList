const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM test ORDER BY id', (err, result) => {
    if(err) return next(err);

    res.json(result.rows);
  });
});

router.post('/', (req, res, next) => {
  const {currentTitle, currentAuthor} = req.body;

  pool.query('INSERT INTO test(name, description) VALUES($1, $2)', [currentTitle, currentAuthor], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.put('/', (req, res, next) => {
  const {currentid, currentTitle, currentAuthor} = req.body;

  pool.query('UPDATE test SET name=$1, description=$2 WHERE id=$3', [currentTitle, currentAuthor, currentid], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res, next) => {
  pool.query('DELETE FROM test WHERE id=$1', [req.params.id], (err, result) => {
    if(err) return next(err);

    res.sendStatus(200);
  });
});

module.exports = router;