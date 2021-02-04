const express = require('express');

const router = express.Router();
const connexion = require('../data/mysql');

router.get('/users', (req, res) => {
  res.status(200).send('<h1>You welcome into my app</h1>');
});

module.exports = router;
