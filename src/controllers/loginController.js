require('dotenv/config');
const jwt = require('jsonwebtoken');

const { loginService } = require('../services/index');

const jwtSecret = process.env.JWT_SECRET;

const generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    const error = loginService.loginService({ email, password });
    if (error) res.status(400).json({ message: 'Some required fields are missing' });
    const jwtConfig = {
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { email } }, jwtSecret, jwtConfig);
    res.status(200).json({ token });
  } catch (err) {
    return err;
  }
};

module.exports = {
  generateToken,
};