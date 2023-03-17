const express = require('express');
const crypto = require('crypto');
const { validateLogin } = require('../middlewares');

const router = express.Router();

const generateCrypto = () => crypto.randomBytes(8).toString('hex');

router.post(
  '/',
  validateLogin,
  (_req, res) => res.status(200)
    .json({ token: generateCrypto() }),
);

module.exports = router;