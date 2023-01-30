const { User } = require('../models');

const generateToken = async (email, password) => {
  const users = await User.findOne({
    attributes: ['id', 'email', 'password'],
    where: { email, password },
  });
  if (!users) return { type: 'INEXISTENT_USER', message: 'Invalid fields' };
  return { type: null, message: users };
};

module.exports = {
  generateToken,
};