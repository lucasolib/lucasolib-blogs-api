const { verifyLogin } = require('./validations/validateInputs');

const loginService = (email, password) => {
  const error = verifyLogin({ email, password });
  if (error.type) return error;
  return { type: 200, message: 'Fields validated' };
};

module.exports = {
  loginService,
};