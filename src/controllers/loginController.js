require('dotenv/config');
const jwt = require('jsonwebtoken');

const { loginService } = require('../services/index');

const jwtSecret = process.env.JWT_SECRET;

const generateToken = async (req, res) => {
    const { email, password } = req.body;
    const error = await loginService.generateToken(email, password);
    console.log(error);
    if (error.type) return res.status(400).json({ message: error.message });
    const jwtConfig = {
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { email } }, jwtSecret, jwtConfig);
    return res.status(200).json({ token });
};

module.exports = {
  generateToken,
};