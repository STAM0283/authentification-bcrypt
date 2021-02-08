const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const connexion = require('../data/mysql');

router.get('/', (_, res) => {
  res.status(200).send('<h1>You welcome into my app</h1>');
});
router.get('/users', (_, res) => {
  connexion.query('SELECT * FROM user', (err, result) => {
    if (err) {
      res.status(400).send('Error to display users');
    } else {
      res.status(200).send(result);
    }
  });
});
router.post('/users', async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const { username } = req.body;
    const { email } = req.body;
    const password = hashPassword;
    connexion.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
      if (err) {
        res.status(400).send('Error to Add user');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(result);
      }
    });
  } catch {
    res.status(500).send('Error to hash password');
  }
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  connexion.query(
    'SELECT * FROM user WHERE (username, email) = (?, ?)',
    [username, email],
    async (err, result) => {
      if (err) {
        res.send({ err });
      }

      if (result.length > 0) {
        await bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send({
              status: 200,
              message: 'Success',
              data: response,
            });
          } else {
            res.send({
              error,
              message: 'Wrong username/password combination!',
            });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    },
  );
});

module.exports = router;
