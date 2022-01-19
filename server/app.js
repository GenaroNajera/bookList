const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});