require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await userService.createUser(displayName, email, password, image);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const { id } = message.dataValues;
  const token = jwt.sign({ data: { email, id } }, jwtSecret, jwtConfig);
  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const { type, message } = await userService.getAllUsers();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteUserMe = async (req, res) => {
  const { user: { email } } = req.body;
  const { type, message } = await userService.deleteUserMe(email);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).end();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserMe,
};