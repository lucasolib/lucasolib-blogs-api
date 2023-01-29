const { User } = require('../models');
const { validateUser } = require('./validations/validateInput');

const createUser = async (displayName, email, password, image) => {
  const error = validateUser(displayName, email, password, image);
  if (error.type) return error;
  const user = await User.findOne({
    attributes: ['email'],
    where: { email },
  });
  if (user) return { type: 'USER_ALREADY_EXIST', message: 'User already registered' };
  const createdUser = await User.create({ displayName, email, password, image });
  return { type: null, message: createdUser };
};

module.exports = {
  createUser,
};