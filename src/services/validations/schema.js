const Joi = require('joi');

const verifyLogin = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  verifyLogin,
};