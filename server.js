const express = require('express');
const path = require('path');

const port = 3001 || process.env.PORT;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

app.use('/api', usersRouter);
app.get('/api/*', (_, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server has lisned at port ${port}`);
  }
});
