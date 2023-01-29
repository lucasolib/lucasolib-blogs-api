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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return { type: null, message: users };
};

const getUserById = async (id) => {
  const user = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { id },
  });
  if (!user) return { type: 'USER_DOES_NOT_EXIST', message: 'User does not exist' };
  return { type: null, message: user };
};

const deleteUserMe = async (email) => {
  const userToDelete = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { email },
  });
  if (!userToDelete) return { type: 'USER_DOES_NOT_EXIST', message: 'User does not exist' };
  const user = await User.destroy({
    where: { email },
  });
  return { type: null, message: user };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserMe,
};