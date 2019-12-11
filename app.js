const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1);

app.use('/', require('./routes'));

app.use((req, res, next) => {
  res.status('404').send('Not found');
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});