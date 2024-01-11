const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    title: 'API Controle-Livros',
    version: '0.0.1',
  });
});

module.exports = router;
