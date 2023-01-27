const express = require('express');
const { loginController } = require('../controllers/index');

const routerLogin = express.Router();

routerLogin.post('/', loginController.generateToken);

module.exports = routerLogin;