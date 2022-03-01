const express = require('express');
const app = express();
const cors = require('cors');

const currentRouter = require('./routes/currentRoute.js');
const completedRouter = require('./routes/completedRoute.js');
const nextRouter = require('./routes/nextRoute.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/current', currentRouter);
app.use('/completed', completedRouter);
app.use('/next', nextRouter);

//error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send(err);
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});