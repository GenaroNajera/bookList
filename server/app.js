const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js'); // connects database to server

app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  pool.query('SELECT * FROM test', (err, result) => {
    if(err) return next(err);
    
    res.send(result.rows);
  });
});

app.post('/', (req, res) => {
  const {name, description} = req.body;
  pool.query('INSERT INTO test(name, description) VALUES($1, $2)', [name, description], (err, result) => {
    if(err) return next(err);

    console.log(result);
    res.send('ok');
  });
});

app.use((err, req, res, next) => { //error handler
  res.status(500).send(err.message);
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});