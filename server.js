const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const port = 3000 || process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server has lisned at port ${port}`);
  }
});
