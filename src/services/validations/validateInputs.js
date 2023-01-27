const { verifyLogin } = require('./schema');

const validateLogin = (loginInfos) => {
  const { error } = verifyLogin(loginInfos);
  if (error) return { type: 'INVALID_FIELD', message: 'Some required fields are missing' };
  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
};