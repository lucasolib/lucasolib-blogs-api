const express = require('express');
const { loginController } = require('../controllers/index');
const { validateLogin } = require('../middlewares/validatelogin');

const routerLogin = express.Router();

routerLogin.post('/', validateLogin, loginController.generateToken);

module.exports = routerLogin;