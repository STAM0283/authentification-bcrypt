const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', usersRouter);

const port = 3000 || process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server has lisned at port ${port}`);
  }
});
