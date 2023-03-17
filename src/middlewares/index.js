const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateWatchedAt = require('./validateWatchedAt');
const validateRate = require('./validateRate');
const existingId = require('./existingId');

module.exports = {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  existingId,
};